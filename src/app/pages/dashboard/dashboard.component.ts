/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class DashboardComponent implements OnInit {

  @Input() onUserDataChanged: EventEmitter<User>;
  @Input() darkTheme: boolean;
  @Output() logout = new EventEmitter();
  @Output() changeTheme = new EventEmitter<boolean>();

  onPollsChanged = new EventEmitter<Poll[]>();
  userData: User;
  currentPage: any;
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
  ) {}

  /**
   * Establishes the communication through the router outlet
   *
   * @param componentReference Reference of the currently opened page within the router
   */
  onActivate(componentReference): void {
    this.currentPage = componentReference;
    // Attach user data
    if (this.currentPage.onUserDataChanged !== null) {
      this.currentPage.onUserDataChanged = this.onUserDataChanged;
      this.currentPage.onUserDataChanged.emit(this.userData);
    }
    if (this.currentPage.onPollsChanged !== null) {
      this.currentPage.onPollsChanged = this.onPollsChanged;
      this.currentPage.onPollsChanged.emit(this.polls);
    }
    // Subscribe to child event emitters
    this.currentPage.pollSelected.subscribe(poll => {
      this.router.navigateByUrl('/dashboard/my-polls/' + poll.id);
    });
  }

  /**
   * Initialize the dashboard component
   */
  ngOnInit(): void {
    // Subscribe to parent event emitters
    this.onUserDataChanged.subscribe(user => {
      this.userData = user;
      this.loadPolls();
    });
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
