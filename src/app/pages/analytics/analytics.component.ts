/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {User} from '../../model/user';
import {Poll} from '../../model/poll';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent {

  // Event Emitters
  onUserDataChanged = new EventEmitter<User>();
  onPollsChanged = new EventEmitter<Poll[]>();

  // Variables
  userData: User;
  polls: Poll[];

  constructor() {
    // Subscribe to own Event Emitters
    this.onUserDataChanged.subscribe(userData => this.userData = userData);
    this.onPollsChanged.subscribe(polls => this.polls = polls);
  }
}
