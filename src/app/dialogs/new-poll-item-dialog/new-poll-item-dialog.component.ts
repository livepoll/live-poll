import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-poll-item-dialog',
  templateUrl: './new-poll-item-dialog.component.html',
  styleUrls: ['./new-poll-item-dialog.component.sass']
})
export class NewPollItemDialogComponent implements OnInit {

  @Input('visible') isVisible: boolean;
  step = 1;
  loading = false;
  name = '';
  itemTypes = [
    { id: 1, name: 'Open Text Question', description: 'Enables the user to fill in a text as answer.' },
    { id: 2, name: 'Multiple Choice Question', description: 'Lets the user choose between several, pre-defined answers.' },
    { id: 3, name: 'Quiz Question', description: 'Multiple choice question, which displays the right answer afterwards.' },
    { id: 4, name: 'Word Cloud Question', description: 'Single word can be entered. The words will be arranged in form of clouds.' },
    { id: 5, name: 'Rating Question', description: 'Star rating.' },
  ];
  itemType = 1;

  ngOnInit(): void {}

  handleNext(): void {
    if (this.step === 3) {
      this.loading = true;
    } else {
      this.step++;
    }
  }

  handleBack(): void {
    this.step--;
  }
}
