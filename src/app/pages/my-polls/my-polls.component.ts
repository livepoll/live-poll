/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Poll} from '../../model/poll';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.sass']
})
export class MyPollsComponent implements OnInit {

  @Input() onUserDataChanged: EventEmitter<User>;
  @Input() onPollsChanged: EventEmitter<Poll[]>;
  @Output() reloadPolls = new EventEmitter();

  userData: User;
  polls: Poll[]; // undefined == loading, null == error
  showNewPollDialog = false;

  /**
   * Initialize sign up component
   *
   * @param http Injected http client
   * @param router Injected router service
   */
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Initialize MyPolls component
   */
  ngOnInit(): void {
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
    if (success) this.reloadPolls.emit();
    this.showNewPollDialog = false;
  }
}
