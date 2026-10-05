import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('the user is on the DS Algo Home Page', async ({ page }) => {
  await page.goto('https://dsportalapp.herokuapp.com/');
});

When('the user clicks the Sign in link', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
});

Then(
  'the user is redirected to the Sign in page and the page title is {string}',
  async ({ page }, expectedTitle) => {
    await expect(page).toHaveURL(/login/);
    await expect(page).toHaveTitle(expectedTitle);
  }
);