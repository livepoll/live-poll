/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {Poll} from '../../model/poll';
import {User} from '../../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

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
