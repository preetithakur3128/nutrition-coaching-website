import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  
  expect: {
    timeout: 10000
  },
  
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  
  reporter: [
    ['html'],
    ['list']
  ],
  
  use: {
    baseURL: 'https://stunning-llama-72ce6d.netlify.app',
    
    // 📸 SCREENSHOT SETTINGS
    screenshot: 'on',  // 'on' = always, 'only-on-failure' = only when fails
    
    // 🎥 VIDEO SETTINGS  
    video: 'on',  // 'on' = always, 'retain-on-failure' = only when fails
    
    // 📋 TRACE SETTINGS (detailed debugging)
    trace: 'retain-on-failure',
    
    // Browser settings
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
      },
    },
  ],
  
  // Output folders
  outputDir: 'test-results/',
});
