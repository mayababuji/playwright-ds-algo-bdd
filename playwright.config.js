import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config();

const { BASE_URL } = process.env;

if (!BASE_URL) {
  throw new Error('BASE_URL is missing from .env');
}
const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: [
    'steps/**/*.steps.js',
    'fixtures.js'
  ],
  outputDir: 'tests/generated'
});

export default defineConfig({
  testDir,

  timeout: 30 * 1000,
  retries: process.env.CI ? 1 : 0,

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['allure-playwright', {
      resultsDir: 'allure-results'
    }]
  ],

  use: {
     baseURL: BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});