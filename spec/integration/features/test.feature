Feature: Test
  Scenario: Testing all the possible scenarios
    Given I run the cucumber suits
    When I fail an assert
    And I fail a throws
    And I pass multiple equals
    And I fail multiple equals
    And I fail a doesNotThrow
    And I fail a ifError
    And I pass an assert
    Then everything worked as expected