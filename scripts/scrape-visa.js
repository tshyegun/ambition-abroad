'use strict';

const fs = require('fs');
const path = require('path');

function main() {
  console.log('=== Visa knowledge base injector ===');

  const dataPath = path.join(__dirname, '..', 'knowledge', 'visa-data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const visas = data.visas;

  if (!visas || visas.length === 0) {
    console.error('ERROR: No visa entries found in knowledge/visa-data.json');
    process.exit(1);
  }

  const htmlPath = path.join(__dirname, '..', 'visa', 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  const START = '// KNOWLEDGE_BASE_START';
  const END   = '// KNOWLEDGE_BASE_END';

  if (!html.includes(START) || !html.includes(END)) {
    console.error('ERROR: KNOWLEDGE_BASE markers not found in visa/index.html');
    process.exit(1);
  }

  const block = `${START}\nconst KNOWLEDGE_BASE = ${JSON.stringify(visas)};\n${END}`;
  const si = html.indexOf(START);
  const ei = html.indexOf(END) + END.length;
  html = html.slice(0, si) + block + html.slice(ei);
  fs.writeFileSync(htmlPath, html);

  console.log(`Injected ${visas.length} visa entries into visa/index.html`);
  console.log('=== Done ===');
}

main();
