import {Component, Input, OnInit} from '@angular/core';

// Constants
const STEP_LABELS = [
  'Select item type',
  'Enter question / answers',
  'Options'
];
const ITEM_TYPES = [
  { id: 1, name: 'Open Text Question', description: 'Enables the user to fill in a text as answer' },
  { id: 2, name: 'Multiple Choice Question', description: 'Lets the user choose between several, pre-defined answers' },
  { id: 3, name: 'Quiz Question', description: 'Multiple choice question, which displays the right answer afterwards' },
  { id: 4, name: 'Word Cloud Question', description: 'Single word can be entered. The words will be arranged in form of clouds' },
  { id: 5, name: 'Rating Question', description: 'Star rating.' },
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
export class NewPollItemDialogComponent implements OnInit {

  // Constant associations
  stepLabels = STEP_LABELS;
  itemTypes = ITEM_TYPES;

  @Input() isVisible: boolean;
  step = 1;
  loading = false;
  errorMessage = '';
  itemType = 0;
  question = '';

  ngOnInit(): void {}

  /**
   * User clicked on 'Next' button.
   * It handles the validity check of the entries on the current page and throws an
   * error message or redirects the use to the next page if the user input is valid
   */
  handleNext(): void {
    if (this.step === STEP_LABELS.length) {
      this.loading = true;
    } else {
      // Validity check
      switch (this.step) {
        case 1:
          if (this.itemType === 0) {
            this.errorMessage = 'Please select an item type.';
            return;
          }
          break;
        case 2:
          if (this.question === '') {
            this.errorMessage = 'Please enter a question.';
            return;
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
  }

  /**
   * User clicked on the 'Cancel' button.
   * Method closes the dialog to cancel the creation operation.
   */
  handleCancel(): void {
    if (!this.loading) {
      this.isVisible = false;
    }
  }
}
