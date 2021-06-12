/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Injectable} from '@angular/core';
import {Poll} from '../model/poll';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {MultipleChoiceItemParticipant} from '../model/poll-item-participant/multiple-choice-item-participant';
import {QuizItemParticipant} from '../model/poll-item-participant/quiz-item-participant';
import {OpenTextItemParticipant} from '../model/poll-item-participant/open-text-item-participant';

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
  ) {
  }

  /**
   * Calculates the status of the poll, based on the startDate and endDate
   */
  getPollStatus(poll: Poll): number {
    const startDate = poll.startDate;
    const endDate = poll.endDate;
    const currentDate = new Date().getTime();

    if (
      (!startDate && !endDate) || // Manual opening, manual closing
      (startDate > currentDate) // Start date not reached
    ) {
      // Poll is pending
      return 1;
    } else if (
      (startDate <= currentDate && endDate > currentDate) || // We're in between of the two dates
      (startDate <= currentDate && !endDate) // Started, manual closing
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
    this.notificationService.error('An error occurred', message, {nzPlacement: 'topRight'});
  }

  /**
   * Shows an success message with a custom message
   *
   * @param message Custom success message
   */
  showSuccessMessage(message: string): void {
    this.notificationService.success('Action successful', message, {nzPlacement: 'topRight'});
  }

  /**
   * Converts a CamelCase name to kebab-case
   *
   * @param name Name to be converted
   */
  convertCamelCaseToKebabCase(name: string): string {
    return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
      .toLowerCase();
  }

  // Fisher-Yates Shuffle
  // https://bost.ocks.org/mike/shuffle/
  shuffleList(array: any[]): any[] {
    let currentIndex = array.length;
    let temp: number;
    let randomIndex: number;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }

    return array;
  }

  parsePollItemObject(pollItem: any): MultipleChoiceItemParticipant | OpenTextItemParticipant | QuizItemParticipant {
    if (!('type' in pollItem)) {
      this.showErrorMessage('Could not parse poll item.');
    }

    switch (pollItem.type) {
      case 'multiple-choice': {
        return new MultipleChoiceItemParticipant({
          ...pollItem,
          position: pollItem.position,
          answers: pollItem.answers
        });
      }
      case 'quiz': {
        return new QuizItemParticipant({
          ...pollItem,
          position: pollItem.position,
          answers: pollItem.answers
        });
      }
      case 'open-text': {
        return new OpenTextItemParticipant({
          ...pollItem,
          position: pollItem.position,
        });
      }
    }
  }
}
