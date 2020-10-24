import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-poll-item-dialog',
  templateUrl: './new-poll-item-dialog.component.html',
  styleUrls: ['./new-poll-item-dialog.component.sass']
})
export class NewPollItemDialogComponent implements OnInit {

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
