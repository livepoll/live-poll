/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Injectable} from '@angular/core';
import {Poll} from '../model/poll';
import {HttpClient} from '@angular/common/http';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class CommonToolsService {

  /**
   * Initialize the service
   * @param notificationService Injected notification service
   */
  constructor(
    private notificationService: NzNotificationService
  ) {}

  /**
   * Calculates the status of the poll, based on the startDate and endDate
   */
  getPollStatus(poll: Poll): number {
    const startDate = poll.startDate;
    const endDate = poll.endDate;
    const currentDate = new Date();

    if (
      (startDate.getTime() === 0 && endDate.getTime() === 0) || // Manual opening, manual closing
      (startDate > currentDate) // Start date not reached
    ) {
      // Poll is pending
      return 1;
    } else if (
      (startDate <= currentDate && endDate > currentDate) || // We're in between of the two dates
      (startDate <= currentDate && endDate.getTime() === 0) // Started, manual closing
    ) {
      // Poll is running
      return 2;
    } else if (
      (endDate < currentDate) // End date already reached
    ) {
      // Poll is finished
      return 3;
    } else {
      // Invalid status, something went wrong
      return 0;
    }
  }

  /**
   * Shows an error message with a custom message
   *
   * @param message Custom error message
   */
  showErrorMessage(message: string): void {
    this.notificationService.error('An error occurred', message, { nzPlacement: 'topRight' });
  }

  /**
   * Shows an success message with a custom message
   *
   * @param message Custom success message
   */
  showSuccessMessage(message: string): void {
    this.notificationService.success('Action successful', message, { nzPlacement: 'topRight' });
  }
}
