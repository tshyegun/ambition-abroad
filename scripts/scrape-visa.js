'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const URLS = [
  'https://www.immi-moj.go.jp/english/',
  'https://www.immi-moj.go.jp/newimmiact_3/en/index.html',
  'https://www.jetro.go.jp/en/invest/setting_up/',
  'https://www.japan-guide.com/e/e2221.html',
  'https://www.realestate.co.jp/en/blog/japan-work-visa-types/',
  'https://resources.realestate.co.jp/living/types-of-japan-visa/',
  'https://www.globalvisas.com/japan_visa/japan_visa_information.html',
];

// Elements to strip before extracting text
const STRIP = [
  'nav', 'header', 'footer', 'aside',
  '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]',
  '.nav', '.navigation', '.navbar', '.menu', '.sidebar', '.widget',
  '.ad', '.ads', '.advertisement', '.advert', '.sponsored',
  '.cookie', '.cookie-banner', '.cookie-notice', '.cookie-popup',
  '.social', '.share', '.sharing', '.social-links',
  '.breadcrumb', '.breadcrumbs',
  '.related', '.related-posts', '.related-articles',
  '.popup', '.modal', '.overlay',
  'script', 'style', 'iframe', 'noscript',
];

// Prefer these containers for main body content
const MAIN_SELECTORS = [
  'main',
  '[role="main"]',
  'article',
  '#main-content',
  '#content',
  '.main-content',
  '.page-content',
  '.entry-content',
  '.post-content',
  '.article-body',
];

const MAX_CHARS = 4000; // per source

async function scrapeUrl(url) {
  console.log(`  Scraping: ${url}`);
  try {
    const res = await axios.get(url, {
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const $ = cheerio.load(res.data);

    // Remove noise elements
    STRIP.forEach(sel => { try { $(sel).remove(); } catch {} });

    // Extract main content
    let content = '';
    for (const sel of MAIN_SELECTORS) {
      const el = $(sel).first();
      if (el.length && el.text().trim().length > 200) {
        content = el.text();
        break;
      }
    }
    if (!content) content = $('body').text();

    // Normalise whitespace
    content = content
      .replace(/\t/g, ' ')
      .replace(/[ ]{2,}/g, ' ')
      .replace(/\n[ ]+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
      .slice(0, MAX_CHARS);

    console.log(`    ✓ ${content.length} chars`);
    return { url, scrapedAt: new Date().toISOString(), content, error: null };

  } catch (err) {
    console.error(`    ✗ ${err.message}`);
    return { url, scrapedAt: new Date().toISOString(), content: null, error: err.message };
  }
}

async function main() {
  console.log('=== Visa data scraper ===');

  // Scrape all URLs sequentially to avoid rate limits
  const sources = [];
  for (const url of URLS) {
    sources.push(await scrapeUrl(url));
  }

  const output = { updatedAt: new Date().toISOString(), sources };

  // Save knowledge/visa-data.json
  const knowledgeDir = path.join(__dirname, '..', 'knowledge');
  fs.mkdirSync(knowledgeDir, { recursive: true });
  fs.writeFileSync(path.join(knowledgeDir, 'visa-data.json'), JSON.stringify(output, null, 2));
  console.log('\nSaved knowledge/visa-data.json');

  // Build the trimmed KB array (successful scrapes only)
  const kbData = sources
    .filter(s => s.content)
    .map(s => ({ url: s.url, scrapedAt: s.scrapedAt, content: s.content }));

  // Inject into visa/index.html between marker comments
  const htmlPath = path.join(__dirname, '..', 'visa', 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  const START = '// KNOWLEDGE_BASE_START';
  const END   = '// KNOWLEDGE_BASE_END';

  if (!html.includes(START) || !html.includes(END)) {
    console.error('ERROR: KNOWLEDGE_BASE markers not found in visa/index.html');
    process.exit(1);
  }

  const block = `${START}\nconst KNOWLEDGE_BASE = ${JSON.stringify(kbData)};\n${END}`;
  const si = html.indexOf(START);
  const ei = html.indexOf(END) + END.length;
  html = html.slice(0, si) + block + html.slice(ei);
  fs.writeFileSync(htmlPath, html);

  const ok = kbData.length;
  console.log(`Injected ${ok}/${sources.length} sources into visa/index.html`);
  console.log('=== Done ===');
}

main().catch(err => { console.error(err); process.exit(1); });
