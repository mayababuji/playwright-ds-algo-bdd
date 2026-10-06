@login
Feature: Login to DS-ALGO Application and validate login page with different scenarios

  @TestScenario_login_01
  Scenario: To verify that the user is able to land on the Sign Page
    Given the user is on the DS Algo Home Page
    When the user clicks the Sign in link
    Then the user is redirected to the Sign in page and the page title is "Login"


  @TestScenario_login_02
  Scenario Outline: Verify that user is able to land on Login Page
    Given the user is on the DS Algo Login Page
    When the user enters valid user name and password
    Then the user should land on Data Structure Home Page with message "You are logged in"