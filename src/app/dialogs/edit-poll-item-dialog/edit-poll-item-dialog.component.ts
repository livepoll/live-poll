/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OPTIONS_DATA, OptionType} from '../../shared/poll-item-options';
import {Poll} from '../../model/poll';
import {CommonToolsService} from '../../service/common-tools.service';
import {PollItemService} from '../../service/poll-item.service';
import {OpenTextItemCreate} from '../../model/poll-item-create/open-text-item-create';
import {MultipleChoiceItemCreate} from '../../model/poll-item-create/multiple-choice-item-create';
import {QuizItemCreate} from '../../model/poll-item-create/quiz-item-create';
import {PollItem} from '../../model/poll-item-create/poll-item';

// Constants
const STEP_LABELS = [
  'Update question / answers',
  'Update options'
];

/**
 * Wizard dialog, which lets the user edit an existing poll item.
 * The dialog consists of two pages, whose appearance differ based on the selected item type.
 */
@Component({
  selector: 'app-edit-poll-item-dialog',
  templateUrl: './edit-poll-item-dialog.component.html',
  styleUrls: ['./edit-poll-item-dialog.component.sass']
})
export class EditPollItemDialogComponent {

  // Constant associations
  stepLabels = STEP_LABELS;
  optionTypes = OptionType;

  // Event Emitters
  @Input() isVisible: boolean;
  @Input() poll: Poll;
  @Input() pollItem: PollItem;
  @Output() finish = new EventEmitter<boolean>(); // true = success; false = cancel

  // Variables
  step = 1;
  loading = false;
  errorMessage = '';
  itemType = 0;
  question = '';
  answers = ['', ''];
  options = [];

  /**
   * Initialize the component
   *
   * @param pollItemService Injected PollItemService
   * @param tools Injected ToolsService
   */
  constructor(
    private pollItemService: PollItemService,
    private tools: CommonToolsService
  ) {}

  /**
   * User clicked on 'Next' button.
   * It handles the validity check of the entries on the current page and throws an
   * error message or redirects the use to the next page if the user input is valid
   */
  handleNext(): void {
    if (this.step === STEP_LABELS.length) {
      this.step++;
      this.editPollItem(this.poll.id, this.question, this.answers);
    } else {
      // Validity check
      switch (this.step) {
        case 1:
          if (this.itemType === 0) {
            this.errorMessage = 'Please select an item type.';
            return;
          }
          // Inputs are valid, set options data of selected item type
          this.options = OPTIONS_DATA[this.itemType - 1].filter(option => option.visibleAtCreation);
          break;
        case 2:
          if (this.question === '') {
            this.errorMessage = 'Please enter a question.';
            return;
          } else if (this.itemType === 2 || this.itemType === 3) {
            // Multiple choice or quiz question
            this.answers = this.trimAnswers();
            if (this.answers[0] === '' || this.answers[1] === '') {
              this.errorMessage = 'Please specify at least two possible answers';
              return;
            } else if (this.answers.length < 2) {
              this.errorMessage = 'Please specify at least two unique answers';
              return;
            }
          }
          break;
      }
      // Valid input, can go to next step
      this.step++;
      this.errorMessage = '';
    }
  }

  /**
   * User clicked on the 'Back' button.
   * Method redirects the user to the previous wizard page.
   */
  handleBack(): void {
    this.step--;
    this.errorMessage = '';
  }

  /**
   * User clicked on the 'Cancel' button.
   * Method closes the dialog to cancel the creation operation.
   */
  handleCancel(): void {
    if (!this.loading) this.finish.emit(false);
  }

  /**
   * Trims the list of entered answers to get rid of empty answers and duplicates.
   * Note: The list has to be at least two elements long to display the correct UI.
   */
  trimAnswers(): string[] {
    const trimmed = this.answers
      .map(v => v.trim()) // Remove blanks or tabs from the end of each answer
      .filter((v, i, a) => a.indexOf(v) === i) // Filter out dupes
      .filter(v => v !== ''); // Filter out blank items
    while (trimmed.length < 2) { trimmed.push(''); } // Fill up with blank items
    return trimmed;
  }

  trackByFn(index: any, _: any): number {
    return index;
  }

  editPollItem(pollId: number, question: string, answers): void {
    this.loading = true;

    let pollItem;
    switch (this.itemType) {
      case 1: // Open text item
        pollItem = new OpenTextItemCreate({ pollId, question });
        break;
      case 2: // Multiple choice item
        pollItem = new MultipleChoiceItemCreate({ pollId, question, selectionOptions: answers });
        break;
      case 3: // Quiz item
        pollItem = new QuizItemCreate({ pollId, question, selectionOptions: answers });
        break;
    }

    this.pollItemService.create(pollItem).subscribe((_) => {
      this.finish.emit(true);
      // Reset dialog
      this.step = 1;
      this.itemType = 0;
      this.question = '';
      this.answers = ['', ''];
      this.options = [];
      this.loading = false;
    }, (_) => {
      this.tools.showErrorMessage('An unknown error occurred. Please try again.');
      this.loading = false;
      this.step--;
    });
  }
}
