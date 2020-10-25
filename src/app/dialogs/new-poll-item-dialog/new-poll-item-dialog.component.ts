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
      }
      this.step++;
    }
  }

  handleBack(): void {
    this.step--;
  }
}
