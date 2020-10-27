Feature: Create New Poll

  Scenario: Create new poll successfully
    Given User is logged in
    And  User has opened new poll item menu
    When I enter "my new poll" into input field with id "input-name"
    And I click button with id "btn-create"
    Then Notification with text "Poll successfully created" is displayed

  Scenario: Create new poll with empty name
    Given User is logged in
    And  User has opened new poll item menu
    When I enter "" into input field with id "input-name"
    And I click button with id "btn-create"
    Then Notification with text "Please enter a name" is displayed