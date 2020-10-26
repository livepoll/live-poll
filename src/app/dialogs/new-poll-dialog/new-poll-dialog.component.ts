import {Component, Input, OnInit} from '@angular/core';

/**
 * Wizard dialog, which lets the user create a new poll.
 * The dialog shows an input field for the name of the poll.
 */
@Component({
  selector: 'app-new-poll-dialog',
  templateUrl: './new-poll-dialog.component.html',
  styleUrls: ['./new-poll-dialog.component.sass']
})
export class NewPollDialogComponent implements OnInit {

  @Input('visible') isVisible: boolean;
  loading = false;
  name?: string;
  errorMessage?: string;

  ngOnInit(): void {}

  /**
   * User clicked on the 'Create poll' button.
   * Method executes validity checks for the user input and shows an
   * error message or creates the poll on the server.
   */
  createPoll(): void {
    if (this.name?.length > 0) {
      this.loading = true;
    } else {
      this.errorMessage = 'Please enter a name.';
    }
  }
}
