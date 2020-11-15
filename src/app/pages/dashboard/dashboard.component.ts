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

  @Input() userData: User = null;
  @Input() darkTheme: boolean;
  @Output() changeTheme = new EventEmitter<boolean>();

  isCollapsed = false;
  notifications = [
    { id: 101, title: 'Poll "Test poll" opened', message: 'Your poll "Test poll" opened to participants. Share this link to your participants: <a href="https://www.live-poll.de/p/test-poll">https://www.live-poll.de/p/test-poll</a>', silent: true },
    { id: 102, title: 'Poll "Test poll" closed', message: 'Your poll "Test poll" is closed now for all participants.', silent: false }
  ];
  polls: any;

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
   * Initialize the dashboard component
   */
  ngOnInit(): void {
    // Load user data
    if (this.userData !== null) this.loadPolls();
  }

  /**
   * Loads all polls of the current user
   */
  loadPolls(): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'application/json', observe: 'response' };
    // Send request
    this.http.get<string>(env.apiBaseUrl + '/user/' + this.userData.id + '/polls', options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
          const polls = JSON.parse(response.body);
          this.polls = polls.map(item => new Poll());
        }
      });
  }

  /**
   * Returns all non-silent notifications from the notifications list
   */
  getNonSilentNotifications(): any[] {
    return this.notifications.filter(n => n.silent === false);
  }
}
