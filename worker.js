const BEEHIIV_API_KEY = '94lDk03aYfzwAEAWIfPN18ufaQv9CyIOMJTUpPxJv86e004BAvH01okwusvos3kR';
const BEEHIIV_PUBLICATION_ID = 'pub_a54dfa97-ef39-420a-846e-d45ba67f54f4';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: CORS });
    }

    let email, firstName;
    try {
      ({ email, firstName } = await request.json());
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: 'email required' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const body = {
      email,
      send_welcome_email: true,
      utm_source: 'visa-evaluator',
      utm_medium: 'tool',
    };
    if (firstName) body.first_name = firstName;

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );

    return new Response(JSON.stringify({ ok: res.ok, status: res.status }), {
      status: res.ok ? 200 : res.status,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  },
};
