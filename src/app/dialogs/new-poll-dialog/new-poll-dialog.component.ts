import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-poll-dialog',
  templateUrl: './new-poll-dialog.component.html',
  styleUrls: ['./new-poll-dialog.component.sass']
})
export class NewPollDialogComponent implements OnInit {

  isVisible = true;
  loading = false;
  name = '';

  ngOnInit(): void {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.loading = true;
    // Create poll on the server

    //this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
