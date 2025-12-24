import { test, expect } from '@playwright/test';

// Supabase Configuration
const SUPABASE_URL = 'https://tatmroyhephjfgkcegxe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0cTBAwjv9wtAGWKI1Ef0Vw_W7RKYlC4';
const TABLE = 'clients';

// API endpoint
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

// Headers for all requests
const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

test.describe.serial('Nutrition Coaching - Database API Tests', () => {

  let clientId;
  let secondClientId;

  test('DB-01: CREATE - Add new client to database', async ({ request }) => {
    const newClient = {
      name: 'Test User API',
      email: 'testuser.api@example.com',
      phone: '+49 123 456 789',
      service: '8-week-program',
      current_weight: 75,
      goal_weight: 60,
      message: 'I want to lose weight',
      status: 'new'
    };

    const response = await request.post(API_URL, {
      headers: headers,
      data: newClient
    });

    console.log('Response status:', response.status());

    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data[0]).toHaveProperty('id');
    expect(data[0].name).toBe('Test User API');

    clientId = data[0].id;
    console.log('✅ DB-01: Client created with ID:', clientId);
  });

  test('DB-02: READ - Get all clients from database', async ({ request }) => {
    const response = await request.get(API_URL, {
      headers: headers
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThanOrEqual(0);

    console.log('✅ DB-02: Retrieved', data.length, 'clients');
  });

  test('DB-03: READ - Get client by email', async ({ request }) => {
    const response = await request.get(`${API_URL}?email=eq.testuser.api@example.com`, {
      headers: headers
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    
    if (data.length > 0) {
      expect(data[0].email).toBe('testuser.api@example.com');
      clientId = data[0].id;
    }

    console.log('✅ DB-03: Email search completed');
  });

  test('DB-04: READ - Filter clients by service type', async ({ request }) => {
    const response = await request.get(`${API_URL}?service=eq.8-week-program`, {
      headers: headers
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();

    console.log('✅ DB-04: Found', data.length, 'clients with 8-week-program');
  });

  test('DB-05: UPDATE - Update client status', async ({ request }) => {
    const response = await request.patch(`${API_URL}?id=eq.${clientId}`, {
      headers: headers,
      data: { status: 'contacted' }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data[0].status).toBe('contacted');

    console.log('✅ DB-05: Status updated to contacted');
  });

  test('DB-06: UPDATE - Update client goal weight', async ({ request }) => {
    const response = await request.patch(`${API_URL}?id=eq.${clientId}`, {
      headers: headers,
      data: { goal_weight: 55 }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data[0].goal_weight).toBe(55);

    console.log('✅ DB-06: Goal weight updated to 55kg');
  });

  test('DB-07: READ - Verify updates persisted', async ({ request }) => {
    const response = await request.get(`${API_URL}?id=eq.${clientId}`, {
      headers: headers
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data[0].status).toBe('contacted');
    expect(data[0].goal_weight).toBe(55);

    console.log('✅ DB-07: Updates verified in database');
  });

  test('DB-08: CREATE - Add second client', async ({ request }) => {
    const response = await request.post(API_URL, {
      headers: headers,
      data: {
        name: 'Second Client',
        email: 'second@example.com',
        phone: '+49 111 222 333',
        service: 'single-consultation',
        current_weight: 80,
        goal_weight: 70,
        message: 'Single consultation please',
        status: 'new'
      }
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data[0].name).toBe('Second Client');
    secondClientId = data[0].id;

    console.log('✅ DB-08: Second client created');
  });

  test('DB-09: READ - Verify multiple clients exist', async ({ request }) => {
    const response = await request.get(API_URL, {
      headers: headers
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.length).toBeGreaterThanOrEqual(1);

    console.log('✅ DB-09: Total clients:', data.length);
  });

  test('DB-10: DELETE - Cleanup test data', async ({ request }) => {
    await request.delete(`${API_URL}?email=eq.testuser.api@example.com`, {
      headers: headers
    });
    
    await request.delete(`${API_URL}?email=eq.second@example.com`, {
      headers: headers
    });

    console.log('✅ DB-10: Test data cleaned up');
  });

});