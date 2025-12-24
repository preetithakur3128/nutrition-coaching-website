import { test, expect } from '@playwright/test';

test('TC11 - Verify Hero → About → Contact navigation and visibility', async ({ page }) => {

  // 1. Go to your live site
  await page.goto('https://stunning-llama-72ce6d.netlify.app/');

  // -----------------------------
  // HERO SECTION CHECKS
  // -----------------------------

  // Verify Hero headline is visible
  await expect(page.getByText('Transform Your Life Through')).toBeVisible();

  // Verify CTA button "Start Your Journey →"
  const heroCTA = page.getByRole('button', { name: 'Start Your Journey →' });
  await expect(heroCTA).toBeVisible();

  // Verify "My Story" button
  const myStoryBtn = page.getByRole('button', { name: 'My Story' });
  await expect(myStoryBtn).toBeVisible();

  // -----------------------------
  // NAVIGATE TO ABOUT SECTION
  // -----------------------------
  await myStoryBtn.click();

  // Verify About section heading
  await expect(page.getByRole('heading', { name: 'My Transformation Story' })).toBeVisible();

  // Verify About stats (using more specific selectors)
  await expect(page.getByText('65→45')).toBeVisible();
  await expect(page.getByText('Months Duration')).toBeVisible();
  await expect(page.getByText('1+ yr')).toBeVisible();

  // Verify About CTA button
  const aboutCTA = page.getByRole('button', { name: 'Book Free Discovery Call →' });
  await expect(aboutCTA).toBeVisible();

  // -----------------------------
  // NAVIGATE TO CONTACT SECTION
  // -----------------------------
  await aboutCTA.click();

  // Verify Contact section heading
  await expect(page.getByRole('heading', { name: 'Book Your Consultation' })).toBeVisible();

  // Verify contact form is visible
  await expect(page.getByPlaceholder('Your name')).toBeVisible();

  console.log('✅ TC11: Hero → About → Contact navigation works!');
});