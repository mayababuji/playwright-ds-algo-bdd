import { defineConfig, devices } from '@playwright/test';
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
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    }
  ]
});