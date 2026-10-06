// Generated from: features/login.feature
import { test } from "../../../fixtures.js";

test.describe('Login to DS-ALGO Application and validate login page with different scenarios', () => {

  test('To verify that the user is able to land on the Sign Page', { tag: ['@login', '@TestScenario_login_01'] }, async ({ Given, When, Then, homePage, page }) => { 
    await Given('the user is on the DS Algo Home Page', null, { homePage }); 
    await When('the user clicks the Sign in link', null, { homePage }); 
    await Then('the user is redirected to the Sign in page and the page title is "Login"', null, { page }); 
  });

  test('Verify that user is able to land on Login Page', { tag: ['@login', '@TestScenario_login_02'] }, async ({ Given, When, Then, homePage, loginPage, page }) => { 
    await Given('the user is on the DS Algo Login Page', null, { homePage }); 
    await When('the user enters valid user name and password', null, { loginPage }); 
    await Then('the user should land on Data Structure Home Page with message "You are logged in"', null, { loginPage, page }); 
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
  {"pwTestLine":12,"pickleLine":12,"tags":["@login","@TestScenario_login_02"],"steps":[{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given the user is on the DS Algo Login Page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When the user enters valid user name and password","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the user should land on Data Structure Home Page with message \"You are logged in\"","stepMatchArguments":[{"group":{"start":62,"value":"\"You are logged in\"","children":[{"start":63,"value":"You are logged in","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end