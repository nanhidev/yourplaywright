require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests',

  timeout: 120000,
  expect: { timeout: 10000 },

  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 2,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  globalSetup: require.resolve('./global-setup'),

  use: {
    baseURL: process.env.BASE_URL || 'https://dev.engazewell.com',

    headless: process.env.CI ? true : false,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    viewport: { width: 1280, height: 720 },

    actionTimeout: 15000,
    navigationTimeout: 30000,

    ignoreHTTPSErrors: true,

    storageState: 'storageState.json',

    launchOptions: {
      slowMo: 0
    }
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ],

  outputDir: 'test-results/',
});