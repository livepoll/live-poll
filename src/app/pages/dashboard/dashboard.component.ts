/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {Poll} from '../../model/poll';
import {PollService} from '../../service/poll.service';

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
  isCollapsed = false;
  notifications = [
    {
      id: 101,
      title: 'Poll "Test poll" opened',
      message: 'Your poll "Test poll" opened to participants. Share this link to your participants: <a href="https://www.live-poll.de/p/test-poll">https://www.live-poll.de/p/test-poll</a>',
      silent: true,
      alreadyRead: false
    },
    {
      id: 102,
      title: 'Poll "Test poll" closed',
      message: 'Your poll "Test poll" is closed now for all participants.',
      silent: false,
      alreadyRead: false
    }
  ];
  polls: Poll[]; // undefined == loading, null == error

  /**
   * Initialize the dashboard component
   *
   * @param router Injected router
   * @param pollService Injected PollService
   */
  constructor(
    private router: Router,
    private pollService: PollService
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
  }

  /**
   * Loads all polls of the current user
   */
  loadPolls(): void {
    this.pollService.getAll().subscribe((polls) => {
      this.polls = polls;
      if (this.onPollsChanged) this.onPollsChanged.emit(polls);
    }, (_) => {
      if (this.onPollsChanged) this.onPollsChanged.emit(null); // Error == null
    });

    /*// Build header, body and options
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
          poll.startDate = new Date(item.startDate);
          poll.endDate = new Date(item.endDate);
          return poll;
        });
        // Emit polls to child elements
        if (this.onPollsChanged) this.onPollsChanged.emit(this.polls);
      }, (_) => {
        if (this.onPollsChanged) this.onPollsChanged.emit(null); // Error == null
      });*/
  }

  /**
   * Returns all non-silent notifications from the notifications list
   */
  getNonSilentNotifications(): any[] {
    return this.notifications.filter(n => n.silent === false);
  }

  /**
   * Marks a single notification as read.
   *
   * @param notificationId Id of the notification to mark as read
   */
  markAsRead(notificationId: number): void {
    this.notifications.find(notification => notification.id = notificationId).alreadyRead = true;
  }
}
