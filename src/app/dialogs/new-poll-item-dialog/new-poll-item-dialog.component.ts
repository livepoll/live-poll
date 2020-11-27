/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OPTIONS_DATA, OptionType} from '../../shared/poll-item-options';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Poll} from '../../model/poll';

// Constants
const STEP_LABELS = [
  'Select item type',
  'Enter question / answers',
  'Options'
];
const ITEM_TYPES = [
  {
    id: 1,
    name: 'Open Text Question',
    description: 'Enables the user to fill in a text as answer',
    endpointFraction: 'opentextitem'
  },
  {
    id: 2,
    name: 'Multiple Choice Question',
    description: 'Lets the user choose between several, pre-defined answers',
    endpointFraction: 'multiplechoiceitem'
  },
  {
    id: 3,
    name: 'Quiz Question',
    description: 'Multiple choice question, which displays the right answer afterwards',
    endpointFraction: 'quizitem'
  },
  {
    id: 4,
    name: 'Word Cloud Question',
    description: 'Single word can be entered. The words will be arranged in form of clouds',
    endpointFraction: 'wordclouditem'
  },
  {
    id: 5,
    name: 'Rating Question',
    description: 'Star rating.',
    endpointFraction: 'ratingitem'
  },
];

/**
 * Wizard dialog, which lets the user create a new poll item.
 * The dialog consists of three pages, whose appearance differ based on the selected item type.
 */
@Component({
  selector: 'app-new-poll-item-dialog',
  templateUrl: './new-poll-item-dialog.component.html',
  styleUrls: ['./new-poll-item-dialog.component.sass']
})
export class NewPollItemDialogComponent {

  // Constant associations
  stepLabels = STEP_LABELS;
  itemTypes = ITEM_TYPES;
  optionTypes = OptionType;

  // Event Emitters
  @Input() isVisible: boolean;
  @Input() poll: Poll;
  @Output() onClose = new EventEmitter<boolean>(); // true = success; false = cancel

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
   * @param http Injected http client
   * @param notificationService Injected notification service
   */
  constructor(
    private http: HttpClient,
    private notificationService: NzNotificationService
  ) {}

  /**
   * User clicked on 'Next' button.
   * It handles the validity check of the entries on the current page and throws an
   * error message or redirects the use to the next page if the user input is valid
   */
  handleNext(): void {
    if (this.step === STEP_LABELS.length) {
      this.step++;
      this.createPollItem(this.poll.id, this.question, 0, this.answers);
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
    if (!this.loading) this.onClose.emit(false);
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

  createPollItem(pollId: number, question: string, position: number, answers: string[]): void {
    this.loading = true;
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, observe: 'response', withCredentials: true };
    const body = { pollId, question, position, answers };
    // Send request
    const endpointFraction = ITEM_TYPES.find(item => item.id === this.itemType).endpointFraction;
    this.http.post<string>(env.apiBaseUrl + '/polls/' + pollId + '/' + endpointFraction, body, options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
          // Request was successful, continue
          this.onClose.emit(false);
        }
      }, (_) => {
        this.showErrorMessage('An unknown error occurred. Please try again.');
        this.loading = false;
        this.step--;
      });
  }

  /**
   * Shows an error message with a custom message
   *
   * @param message Custom error message
   */
  showErrorMessage(message: string): void {
    this.notificationService.error('An error occurred', message, { nzPlacement: 'topRight' });
  }
}
