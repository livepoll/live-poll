/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {User} from '../../model/user';
import {Poll} from '../../model/poll';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {

  // Event Emitters
  onUserDataChanged = new EventEmitter<User>();
  onUserDataChangedChildren: EventEmitter<User>;
  onLogout = new EventEmitter();
  onChangeTheme = new EventEmitter<boolean>();
  onPollsChanged: EventEmitter<Poll[]>;

  // Variables
  darkTheme: boolean;
  userData: User;
  currentPage: any;
  selectedPoll: Poll;
  isCollapsed = false;
  notifications = [
    { id: 101, title: 'Poll "Test poll" opened', message: 'Your poll "Test poll" opened to participants. Share this link to your participants: <a href="https://www.live-poll.de/p/test-poll">https://www.live-poll.de/p/test-poll</a>', silent: true },
    { id: 102, title: 'Poll "Test poll" closed', message: 'Your poll "Test poll" is closed now for all participants.', silent: false }
  ];
  polls: Poll[]; // undefined == loading, null == error

  /**
   * Initialize the dashboard component
   *
   * @param router Injected router
   * @param http Injected http client
   */
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    // Subscribe to own Event Emitters
    this.onUserDataChanged.subscribe(userData => {
      this.userData = userData;
      this.loadPolls();
    });
  }

  /**
   * Establishes the communication through the router outlet
   *
   * @param child Reference of the currently opened page within the router
   */
  onActivate(child): void {
    this.currentPage = child;
    // Wire up child Event Emitters
    if (child.onUserDataChanged) {
      this.onUserDataChangedChildren = child.onUserDataChanged;
      this.onUserDataChangedChildren.emit(this.userData);
    }
    if (child.onPollsChanged) {
      this.onPollsChanged = child.onPollsChanged;
      this.onPollsChanged.emit(this.polls);
    }
    if (child.onReloadPolls) {
      child.onReloadPolls.subscribe(_ => this.loadPolls());
    }
    if (child.onPollSelected) {
      child.onPollSelected.subscribe(poll => {
        this.selectedPoll = poll;
        this.router.navigateByUrl('/dashboard/poll/' + poll.id);
      });
    }
  }

  /**
   * Loads all polls of the current user
   */
  loadPolls(): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'application/json', observe: 'response', withCredentials: true };
    // Send request
    this.http.get<string>(env.apiBaseUrl + '/users/' + this.userData.id + '/polls', options)
      .subscribe((response: HttpResponse<string>) => {
        // Parse polls
        const polls = JSON.parse(response.body);
        this.polls = polls.map(item => {
          const poll = new Poll();
          poll.id = item.id;
          poll.name = item.name;
          poll.startDate = item.startDate;
          poll.endDate = item.endDate;
          return poll;
        });
        // Emit polls to child elements
        this.onPollsChanged.emit(this.polls);
      }, (_) => {
        this.onPollsChanged.emit(null); // Error == null
      });
  }

  /**
   * Returns all non-silent notifications from the notifications list
   */
  getNonSilentNotifications(): any[] {
    return this.notifications.filter(n => n.silent === false);
  }
}
