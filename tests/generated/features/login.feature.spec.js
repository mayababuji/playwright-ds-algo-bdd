// Generated from: features/login.feature
import { test } from "playwright-bdd";

test.describe('Login to DS-ALGO Application and validate login page with different scenarios', () => {

  test('To verify that the user is able to land on the Login Page', { tag: ['@login', '@TestScenario_login_01'] }, async ({ Given, When, Then, page }) => { 
    await Given('the user is on the DS Algo Home Page', null, { page }); 
    await When('the user clicks the Sign in link', null, { page }); 
    await Then('the user is redirected to the Sign in page and the page title is "Login"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@login","@TestScenario_login_01"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given the user is on the DS Algo Home Page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When the user clicks the Sign in link","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the user is redirected to the Sign in page and the page title is \"Login\"","stepMatchArguments":[{"group":{"start":65,"value":"\"Login\"","children":[{"start":66,"value":"Login","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end