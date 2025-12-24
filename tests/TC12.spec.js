import { test, expect } from '@playwright/test';

test('TC12 - Page load performance + Header + Logo + Hero visibility', async ({ page }) => {

  const start = Date.now();

  // 1. Go to your live site
  await page.goto('https://stunning-llama-72ce6d.netlify.app/');
  await page.waitForLoadState('networkidle');

  const loadTime = Date.now() - start;
  console.log('📊 Page Load Time:', loadTime, 'ms');

  // 2. Verify page loads under 5 seconds
  expect(loadTime).toBeLessThan(5000);
  console.log('✅ Page loaded within 5 seconds');

  // 3. Verify Header/Logo is visible
  await expect(page.getByText('🌿 PT Nutrition').first()).toBeVisible();
  console.log('✅ Header & Logo visible');

  // 4. Verify Hero section is visible
  await expect(page.getByText('Transform Your Life Through')).toBeVisible();
  console.log('✅ Hero section visible');

  // 5. Verify Hero CTA buttons
  await expect(page.getByRole('button', { name: 'Start Your Journey →' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'My Story' })).toBeVisible();
  console.log('✅ Hero CTA buttons visible');

  // 6. Verify transformation stats in hero
  await expect(page.getByText('20kg')).toBeVisible();
  await expect(page.getByText('Weight Loss Achieved')).toBeVisible();
  console.log('✅ Transformation stats visible');

  console.log('✅ TC12: Performance + Header + Logo + Hero - ALL PASSED!');
});