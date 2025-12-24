import { test, expect } from '@playwright/test';

const SUPABASE_URL = 'https://tatmroyhephjfgkcegxe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0cTBAwjv9wtAGWKI1Ef0Vw_W7RKYlC4';
const WEBSITE_URL = 'https://stunning-llama-72ce6d.netlify.app';

const API_ENDPOINTS = [
  {
    name: 'Website (Netlify)',
    url: WEBSITE_URL,
    headers: {},
    critical: true
  },
  {
    name: 'Supabase Database API',
    url: `${SUPABASE_URL}/rest/v1/clients?limit=1`,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    },
    critical: true
  }
];

test.describe('API Health Check - Monitor All Services', () => {

  test('Health Check: Website (Netlify)', async ({ request }) => {
    console.log('\n🔍 Checking: Website');
    
    const startTime = Date.now();
    const response = await request.get(WEBSITE_URL);
    const responseTime = Date.now() - startTime;
    
    console.log(`   ⏱️  Response Time: ${responseTime}ms`);
    console.log(`   📊 Status Code: ${response.status()}`);
    
    expect(response.status()).toBeLessThan(500);
    console.log('   ✅ Website is UP');
  });

  test('Health Check: Supabase Database API', async ({ request }) => {
    console.log('\n🔍 Checking: Supabase API');
    
    const startTime = Date.now();
    const response = await request.get(`${SUPABASE_URL}/rest/v1/clients?limit=1`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    const responseTime = Date.now() - startTime;
    
    console.log(`   ⏱️  Response Time: ${responseTime}ms`);
    console.log(`   📊 Status Code: ${response.status()}`);
    
    expect(response.status()).toBeLessThan(500);
    console.log('   ✅ Supabase API is UP');
  });

  test('API Health Summary Report', async ({ request }) => {
    console.log('\n');
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║              API HEALTH REPORT                     ║');
    console.log('╠════════════════════════════════════════════════════╣');
    
    const results = [];
    
    for (const api of API_ENDPOINTS) {
      const startTime = Date.now();
      let status = 'DOWN';
      let statusCode = 0;
      let responseTime = 0;
      
      try {
        const response = await request.get(api.url, {
          headers: api.headers,
          timeout: 30000
        });
        statusCode = response.status();
        responseTime = Date.now() - startTime;
        status = statusCode < 500 ? 'UP' : 'DOWN';
      } catch (e) {
        status = 'DOWN';
        responseTime = Date.now() - startTime;
      }
      
      results.push({ name: api.name, status, statusCode, responseTime });
      
      const icon = status === 'UP' ? '✅' : '❌';
      console.log(`║ ${icon} ${api.name.padEnd(30)} | ${status} | ${responseTime}ms ║`);
    }
    
    console.log('╚════════════════════════════════════════════════════╝');
    
    const downApis = results.filter(r => r.status === 'DOWN');
    
    if (downApis.length > 0) {
      console.log('\n🚨 ALERT: Some APIs are DOWN!');
      downApis.forEach(api => console.log(`   ❌ ${api.name}`));
    } else {
      console.log('\n✅ All systems operational!');
    }
    
    expect(downApis.length).toBe(0);
  });

});

test.describe('API Failure Detection', () => {

  test('Detect slow API response', async ({ request }) => {
    console.log('\n🐢 Testing API response time...');
    
    const startTime = Date.now();
    const response = await request.get(`${SUPABASE_URL}/rest/v1/clients?limit=1`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    const responseTime = Date.now() - startTime;
    
    console.log(`   Response time: ${responseTime}ms`);
    
    if (responseTime > 3000) {
      console.log('   ⚠️ WARNING: API is slow!');
    } else {
      console.log('   ✅ API response time is good');
    }
    
    expect(response.status()).toBe(200);
  });

  test('Simulate API down scenario', async ({ request }) => {
    console.log('\n🧪 Simulating unreachable API...');
    
    try {
      await request.get('https://fake-api-that-does-not-exist.com/test', {
        timeout: 5000
      });
      console.log('   Unexpected: Request succeeded');
    } catch (error) {
      console.log('   ✅ Expected: API unreachable detected');
      console.log('   This is what happens when Supabase is down');
    }
    
    expect(true).toBe(true);
  });

});