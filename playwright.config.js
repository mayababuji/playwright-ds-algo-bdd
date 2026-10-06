// Tells Playwright-BDD how to generate and run tests
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

const environment = process.env.TEST_ENV || 'local';

const environmentFiles = {
  local: '.env.local',
  qa: '.env.qa',
  prod: '.env.prod'
};

const envFile = environmentFiles[environment];

if (!envFile) {
  throw new Error(
    `Invalid TEST_ENV "${environment}". Use local, qa, or prod.`
  );
}

dotenv.config({
  path: envFile,
  override: false
});

const {
  BASE_URL,
  LOGIN_USERNAME,
  LOGIN_PASSWORD
} = process.env;

for (const [name, value] of Object.entries({
  BASE_URL,
  LOGIN_USERNAME,
  LOGIN_PASSWORD
})) {
  if (!value) {
    throw new Error(`${name} is missing for environment "${environment}"`);
  }
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

  outputDir: 'test-results',

  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never'
      }
    ],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results'
      }
    ]
  ],

  use: {
    baseURL: BASE_URL,
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000
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