/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Poll} from '../../model/poll';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {User} from '../../model/user';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent {

  // Constants
  host = location.protocol + '//' + location.host;

  // Event Emitters
  onUserDataChanged = new EventEmitter<User>();

  // Variables
  userData: User;
  poll: Poll;
  pollId: number;
  changingState = false;
  showNewPollItemDialog = false;
  error = false;

  /**
   * Initialize component
   *
   * @param activeRoute Injected active route
   * @param router Injected router
   * @param http Injected http client
   */
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    // Subscribe to own event emitters
    this.onUserDataChanged.subscribe(user => {
      this.userData = user;
      // Check if pollId is already available
      if (this.pollId) this.loadPoll();
    });
    // Subscribe to active route
    this.activeRoute.params.subscribe( params => {
      this.pollId = params.id;
      // Check if userData is already available
      if (this.userData) this.loadPoll();
    });
  }

  /**
   * Is called when the user clicks back in the poll detail view to come back to the poll list
   */
  onBack(): void {
    this.router.navigateByUrl('/dashboard/my-polls');
  }

  /**
   * Transforms the user input to a valid url fragment
   *
   * @param url Customized input url
   */
  onUrlChange(url: string): void {
    url = url === undefined ? '' : url;
    this.poll.snippet = encodeURI(url.toLocaleLowerCase().split(' ').join('-'));
    // TODO: Commit changes to server
  }

  /**
   * Change the poll state on the server
   *
   * @param open Open = true; closed = false
   */
  changePollState(open: boolean): void {
    this.changingState = true;
    if (open) {

    } else {

    }
  }

  /**
   * Is called when the NewPollItemDialog is closed. Triggers an poll reload, if the creation of an item was sucessful
   *
   * @param success Item successfully created
   */
  handleNewPollItemDialogClose(success: boolean): void {
    if (success) this.loadPoll();
    this.showNewPollItemDialog = false;
  }

  /**
   * Loads a single poll from the server
   */
  loadPoll(): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, observe: 'response', withCredentials: true };
    const body = { id: this.pollId };
    // Send request
    this.http.post<string>(env.apiBaseUrl + '/user/' + this.userData.id + '/polls/' + this.pollId, body, options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
          const json = JSON.parse(response.body);
          const poll = new Poll();
          poll.id = json.id;
          poll.name = json.name;
          poll.startDate = json.startDate;
          poll.endDate = json.endDate;
          this.poll = poll;
        }
      }, (_) => {
        this.error = true;
      });
  }
}
