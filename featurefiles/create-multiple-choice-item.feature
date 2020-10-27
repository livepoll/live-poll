Feature: Create Multiple Choice Item

  Scenario: Create new multiple choice item successfully
    Given User is logged in
    And User has created a new poll
    And User opened new poll item menu
    When I select multiple choice item type
    And I enter "Idee" into input field with id "input-question"
    And I enter "Antwort 1" as answer option 1
    And I enter "Antwort 2" as answer option 2
    And I enter "Antwort 3" as answer option 3
    And I click on button with id "btn-save"
    Then Notification with text "Poll item successfully created" is displayed

  Scenario: Create new poll item but don't choose item type
    Given User is logged in
    And User has created a new poll
    And User opened new poll item menu
    When I select no item type
    And I click on button with id "btn-next-step"
    Then Notification with text "Please select item type" is displayed

  Scenario: Create new multiple choice item with only one answer
    Given User is logged in
    And User has created a new poll
    And User opened new poll item menu
    When I select multiple choice item type
    And I enter "Idee" into input field with id "input-question"
    And I enter "Antwort 1" as answer option 1
    And I click on button with id "btn-save"
    Then Notification with text "Please enter more than one answer" is displayed