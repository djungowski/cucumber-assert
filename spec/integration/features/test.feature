Feature: Test
  Scenario: Foobar
    Given I run the cucumber suits
    When I fail an assert
    And I fail a throws
    And I fail a doesNotThrow
    And I fail a ifError
    Then everything worked as expected