/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Poll} from '../../model/poll';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {User} from '../../model/user';
import {Question} from '../../model/question';

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
    // Send request
    this.http.get<string>(env.apiBaseUrl + '/user/' + this.userData.id + '/polls/' + this.pollId, options)
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
        // this.error = true;
        // Mocked item - TODO: please remove later
        // Mock questions
        const question1 = new Question();
        question1.question = 'How are you?';
        question1.pos = 2;
        const question2 = new Question();
        question2.question = 'What did you eat today?';
        question2.pos = 1;
        // Mock poll
        this.poll = new Poll();
        this.poll.id = this.pollId;
        this.poll.snippet = 'adg32kjas';
        this.poll.open = false;
        this.poll.name = 'This is my test poll';
        this.poll.questions = [question1, question2];
        this.poll.startDate = new Date(2020, 11, 28, 11);
        this.poll.endDate = new Date(2020, 11, 29, 12);
      });
  }

  deletePoll(): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, observe: 'response', withCredentials: true };
    // Send request
    this.http.delete<string>(env.apiBaseUrl + '/user/' + this.userData.id + '/polls/' + this.pollId, options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
          this.router.navigateByUrl('/dashboard/my-polls');
        }
      });
  }
}
