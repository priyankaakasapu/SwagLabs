Feature: Login Functionality
Background:
  Given User Launches the Sauce Application

@cart
Scenario Outline: Verify login for multiple Sauce Demo users
  When I login with "<userKey>" user
  Then I should see the login result for "<userKey>"

  Examples:
    | userKey |
    | standard_user |
    | locked_out_user |
    | problem_user |
    | performance_glitch_user |
    | error_user |
    | visual_user |

@cart
Scenario: Verify login with invalid credentials
  When I login with invalid credentials
  Then I should see the invalid login error

