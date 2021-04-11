/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../model/user';
import {CommonToolsService} from '../../service/common-tools.service';
import {PollService} from '../../service/poll.service';
import {Poll} from '../../model/poll';

/**
 * Wizard dialog, which lets the user create a new poll.
 * The dialog shows an input field for the name of the poll.
 */
@Component({
  selector: 'app-new-poll-dialog',
  templateUrl: './new-poll-dialog.component.html',
  styleUrls: ['./new-poll-dialog.component.sass']
})
export class NewPollDialogComponent {

  // Event Emitters
  @Input() userData: User;
  @Input() isVisible: boolean;
  @Output() onClose = new EventEmitter<boolean>(); // true = success; false = cancel

  // Variables
  loading = false;
  name = '';

  /**
   * Initialize the component
   * @param pollService Injected PollService
   * @param tools Injected ToolsService
   */
  constructor(
    private pollService: PollService,
    private tools: CommonToolsService
  ) {}

  /**
   * User clicked on the 'Create poll' button.
   * Method executes validity checks for the user input and shows an
   * error message or creates the poll on the server.
   */
  createPoll(name: string): void {
    this.loading = true;

    // Build poll object
    const poll = new Poll();
    poll.name = name;
    poll.startDate = poll.endDate = 0;

    // Send request
    this.pollService.create(poll).subscribe((_) => {
      // Reset values
      this.name = '';
      this.loading = false;
      // Close dialog
      this.onClose.emit(true);
    }, (_) => {
      this.loading = false;
      this.tools.showErrorMessage('An error occurred while creating the poll.');
    });
    /*// Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'text', observe: 'response', withCredentials: true };
    const body = { name, startDate: 0, endDate: 0 };
    // Send request
    this.http.post<string>(env.apiBaseUrl + '/users/' + this.userData.id + '/poll', body, options)
      .subscribe((_: HttpResponse<string>) => {
        // Reset values
        this.name = '';
        this.loading = false;
        // Close dialog
        this.onClose.emit(true);
      }, (_) => {
        this.loading = false;
        this.tools.showErrorMessage('An error occurred while creating the poll.');
      });*/
  }
}
