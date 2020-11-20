/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {Poll} from '../../model/poll';
import {User} from '../../model/user';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.sass']
})
export class MyPollsComponent {

  // Event Emitters
  onUserDataChanged = new EventEmitter<User>();
  onPollsChanged = new EventEmitter<Poll[]>();
  onReloadPolls = new EventEmitter();
  onPollSelected = new EventEmitter();

  // Variables
  userData: User;
  polls: Poll[]; // undefined == loading, null == error
  showNewPollDialog = false;

  /**
   * Initialize MyPolls component
   */
  constructor() {
    // Subscribe to parent event emitters
    this.onUserDataChanged.subscribe(user => this.userData = user);
    this.onPollsChanged.subscribe(polls => this.polls = polls);
  }

  /**
   * Handles the event of closing the dialog for creating new polls
   *
   * @param success Successful poll creation
   */
  handleNewPollDialogClose(success: boolean): void {
    if (success) this.onReloadPolls.emit();
    this.showNewPollDialog = false;
  }
}
