import { expect } from '@playwright/test';
import {
  Given,
  When,
  Then
} from '../fixtures.js';
import { env } from '../utils/env.js';

Given(
  'the user is on the DS Algo Home Page',
  async ({ homePage }) => {
    await homePage.open();
  }
);

When(
  'the user clicks the Sign in link',
  async ({ homePage }) => {
    await homePage.clickSignIn();
  }
);

Then(
  'the user is redirected to the Sign in page and the page title is {string}',
  async ({ page }, expectedTitle) => {
    await expect(page).toHaveURL(/login/);
    await expect(page).toHaveTitle(expectedTitle);
  }
);
Given('the user is on the DS Algo Login Page', async ({homePage}) => {
  
  await homePage.open();
    await homePage.clickSignIn();
});
When(
  'the user enters valid user name and password',
  async ({ loginPage}) => {
   
    await loginPage.login(
      env.username,
      env.password
    );
  }
);
Then(
  'the user should land on Data Structure Home Page with message {string}',
  async ({ page, loginPage }, expectedMessage) => {
    await expect(page).toHaveURL(/home/i);
    await expect(loginPage.successMessage).toHaveText(expectedMessage);
  }
);