/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {User} from '../../model/user';

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

  @Input() userData: User;
  @Input() isVisible: boolean;
  @Output() onClose = new EventEmitter<boolean>(); // true = success; false = cancel

  loading = false;
  name = '';

  /**
   * Initialize the component
   * @param http Injected http client
   * @param notificationService Injected notification service
   */
  constructor(
    private http: HttpClient,
    private notificationService: NzNotificationService
  ) {}

  /**
   * User clicked on the 'Create poll' button.
   * Method executes validity checks for the user input and shows an
   * error message or creates the poll on the server.
   */
  createPoll(name: string): void {
    this.loading = true;
    // Build header, body and options
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
        this.showErrorMessage('An error occurred while creating the poll.');
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
