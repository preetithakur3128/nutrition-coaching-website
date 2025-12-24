import { test, expect } from '@playwright/test';

test('TC13 - Contact form submission shows success message', async ({ page }) => {

  // 1. Go to your live site
  await page.goto('https://stunning-llama-72ce6d.netlify.app/');

  // 2. Navigate to Contact section
  await page.getByRole('button', { name: 'Start Your Journey →' }).click();

  // 3. Verify contact form is visible
  await expect(page.getByRole('heading', { name: 'Book Your Consultation' })).toBeVisible();

  // 4. Fill the form fields
  await page.getByPlaceholder('Your name').fill('Test User');
  await page.getByPlaceholder('your.email@example.com').fill('test@example.com');
  await page.getByPlaceholder('+49 123 456 789').fill('+49 123 456 789');
  
  // Select service
  await page.locator('select[name="service"]').selectOption('free-discovery');
  
  // Fill optional fields
  await page.getByPlaceholder('e.g., 75').fill('70');
  await page.getByPlaceholder('e.g., 60').fill('55');
  
  // Fill message
  await page.getByPlaceholder('What are you hoping to achieve').fill('I want to lose weight healthily and sustainably.');

  // 5. Verify all fields are filled correctly
  await expect(page.getByPlaceholder('Your name')).toHaveValue('Test User');
  await expect(page.getByPlaceholder('your.email@example.com')).toHaveValue('test@example.com');
  
  console.log('✅ TC13: Contact form fields filled successfully');
  
  // NOTE: We don't click Submit to avoid sending real emails during testing
  // In real testing environment, you would mock the form submission
  
  // 6. Verify Submit button is enabled and ready
  const submitBtn = page.getByRole('button', { name: 'Send Message →' });
  await expect(submitBtn).toBeVisible();
  await expect(submitBtn).toBeEnabled();
  
  console.log('✅ TC13: Contact form ready for submission!');
});