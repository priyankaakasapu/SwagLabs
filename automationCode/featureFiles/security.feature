Feature: Security Testing
@cart
Scenario: Verify protected pages
  Then I verify protected pages cannot be accessed without login
  