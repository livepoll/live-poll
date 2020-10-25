import {Component, Input, OnInit} from '@angular/core';

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

  createPoll(): void {
    if (this.name?.length > 0) {
      this.loading = true;
    } else {
      this.errorMessage = 'Please enter a name.';
    }
  }
}
