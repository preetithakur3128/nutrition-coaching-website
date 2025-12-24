import { test, expect } from '@playwright/test';

const BASE_URL = 'https://stunning-llama-72ce6d.netlify.app';

test.describe('PT Nutrition Coaching Website Tests', () => {

  test('TC01: Homepage loads successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Verify page loads
    await expect(page).toHaveTitle(/PT Nutrition/);
    
    // Verify hero section visible
    await expect(page.getByText('Transform Your Life Through')).toBeVisible();
    
    // Verify transformation badge visible
    await expect(page.getByText('65kg → 45kg in 6 Months')).toBeVisible();
    
    console.log('✅ TC01: Homepage loaded successfully');
  });

  test('TC02: Navigation - All sections accessible', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Click About
    await page.click('button:has-text("about")');
    await expect(page.getByRole('heading', { name: 'My Transformation Story' })).toBeVisible();
    console.log('✅ About section works');
    
    // Click Services
    await page.click('button:has-text("services")');
    await expect(page.getByRole('heading', { name: 'Consultation Options' })).toBeVisible();
    console.log('✅ Services section works');
    
    // Click Testimonials
    await page.click('button:has-text("testimonials")');
    await expect(page.getByRole('heading', { name: 'Success Stories' })).toBeVisible();
    console.log('✅ Testimonials section works');
    
    // Click Contact
    await page.click('button:has-text("contact")');
    await expect(page.getByRole('heading', { name: 'Book Your Consultation' })).toBeVisible();
    console.log('✅ Contact section works');
    
    // Click Home
    await page.click('button:has-text("home")');
    await expect(page.getByText('Transform Your Life Through')).toBeVisible();
    console.log('✅ TC02: All navigation works');
  });

  test('TC03: Contact form - All fields present', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Go to contact section
    await page.click('button:has-text("contact")');
    
    // Verify all form fields exist
    await expect(page.getByPlaceholder('Your name')).toBeVisible();
    await expect(page.getByPlaceholder('your.email@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('+49 123 456 789')).toBeVisible();
    
    // Verify submit button
    await expect(page.getByRole('button', { name: 'Send Message →' })).toBeVisible();
    
    console.log('✅ TC03: All contact form fields present');
  });

  test('TC04: Contact form - Can fill all fields', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('button:has-text("contact")');
    
    // Fill form fields
    await page.getByPlaceholder('Your name').fill('Test User');
    await page.getByPlaceholder('your.email@example.com').fill('test@example.com');
    await page.getByPlaceholder('+49 123 456 789').fill('+49 999 888 777');
    
    // Verify fields are filled
    await expect(page.getByPlaceholder('Your name')).toHaveValue('Test User');
    await expect(page.getByPlaceholder('your.email@example.com')).toHaveValue('test@example.com');
    
    console.log('✅ TC04: Contact form can be filled');
  });

  test('TC05: Services section - All packages displayed', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('button:has-text("services")');
    
    // Verify all 3 packages visible
    await expect(page.getByRole('heading', { name: 'Free Discovery Call' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '8-Week Transformation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Single Consultation' })).toBeVisible();
    
    // Verify prices (using regex for flexibility)
    await expect(page.getByText(/FREE/i).first()).toBeVisible();
    await expect(page.getByText('€249').first()).toBeVisible();
    await expect(page.getByText('€59').first()).toBeVisible();
    
    console.log('✅ TC05: All service packages displayed with prices');
  });

  test('TC06: Services - Book buttons navigate to contact', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('button:has-text("services")');
    
    // Click "Get Started" button (8-week program)
    await page.getByRole('button', { name: 'Get Started' }).click();
    
    // Should navigate to contact section
    await expect(page.getByRole('heading', { name: 'Book Your Consultation' })).toBeVisible();
    
    console.log('✅ TC06: Service buttons navigate to contact');
  });

  test('TC07: Correct email displayed', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('button:has-text("contact")');
    
    // Verify correct email is shown
    await expect(page.getByText('preeti.thakur@tutanota.com')).toBeVisible();
    
    console.log('✅ TC07: Correct email displayed');
  });

  test('TC08: Testimonials - All reviews visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('button:has-text("testimonials")');
    
    // Verify testimonials present
    await expect(page.getByText('Sarah M.')).toBeVisible();
    await expect(page.getByText('Michael K.')).toBeVisible();
    await expect(page.getByText('Anna L.')).toBeVisible();
    
    console.log('✅ TC08: All testimonials displayed');
  });

  test('TC09: Mobile responsive - Page loads on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(BASE_URL);
    
    // Page should still load - check logo
    await expect(page.getByText('🌿 PT Nutrition').first()).toBeVisible();
    
    console.log('✅ TC09: Mobile responsive - page loads correctly');
  });

  test('TC10: Footer - Content verified', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Verify footer content
    await expect(page.getByText('© 2025 PT Nutrition').first()).toBeVisible();
    
    console.log('✅ TC10: Footer content verified');
  });

});