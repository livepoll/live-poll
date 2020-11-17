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
  @Output() pollSelected = new EventEmitter<Poll>();

  userData: User;
  polls: Poll[]; // undefined == loading, null == error
  expandedPoll = -1;
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
    this.onPollsChanged.subscribe(polls => {
      console.log(polls);
      this.polls = polls;
    });
  }

  /**
   * Handles the click event on a poll item of the list
   */
  handlePollClick(poll: Poll): void {
    this.pollSelected.emit(poll);
  }
}
