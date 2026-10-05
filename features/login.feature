@login
Feature: Login to DS-ALGO Application and validate login page with different scenarios

  @TestScenario_login_01
  Scenario: To verify that the user is able to land on the Login Page
    Given the user is on the DS Algo Home Page
    When the user clicks the Sign in link
    Then the user is redirected to the Sign in page and the page title is "Login"