import { test as base, createBdd } from 'playwright-bdd';
import { HomePage } from './pages/HomePage.js';
import { LoginPage } from './pages/LoginPage.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

export const { Given, When, Then } = createBdd(test);
