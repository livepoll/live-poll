/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Poll} from '../../model/poll';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {User} from '../../model/user';
import {PollItem} from '../../model/poll-item';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent {

  // Constants
  host = location.protocol + '//' + location.host;
  currentDate = new Date();

  // Event Emitters
  onUserDataChanged = new EventEmitter<User>();

  // Variables
  userData: User;
  poll: Poll;
  pollId: number;
  changingState = false;
  showNewPollItemDialog = false;
  error = false;
  results = [];

  /**
   * Initialize component
   *
   * @param activeRoute Injected active route
   * @param router Injected router
   * @param http Injected http client
   * @param notificationService Injected notification service
   */
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private notificationService: NzNotificationService
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

    // Keep the current time in sync
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
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
      this.poll.startDate = this.poll.endDate = this.currentDate;
    } else {
      this.poll.endDate = this.currentDate;
    }
    this.updatePoll(() => this.changingState = false);
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
    console.log('Loading');
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'application/json', observe: 'response', withCredentials: true };
    // Send request
    this.http.get<string>(env.apiBaseUrl + '/users/' + this.userData.id + '/polls/' + this.pollId, options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
          // Parse data
          const json = JSON.parse(response.body);
          const poll = new Poll();
          poll.id = json.id;
          poll.name = json.name;
          poll.startDate = new Date(json.startDate);
          poll.endDate = new Date(json.endDate);
          poll.pollItems = [];
          json.pollItems.forEach(item => {
            const pollItem = new PollItem();
            pollItem.id = item.itemId;
            pollItem.question = item.question;
            pollItem.pos = item.position;
            pollItem.type = item.type;
            poll.pollItems.push(pollItem);
          });
          this.poll = poll;
          // Setup result observer
          this.setupResultObserver();
        }
      }, (_) => {
        this.error = true;
        this.showErrorMessage('Something went wrong, loading the poll.');
      });
  }

  /**
   * Commits the poll object to the server
   */
  updatePoll(callback: () => void, error?: () => void): void {
    error = error ?? function(): void {
      this.showErrorMessage('The change could not be committed on the server. Please try again later.');
    };
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, observe: 'response', withCredentials: true };
    const body = {  };
    // Send request
    this.http.put<string>(env.apiBaseUrl + '/users/' + this.userData.id + '/polls/' + this.pollId, body, options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) callback();
      }, (_) => error());
  }

  /**
   * Deletes the current poll from the server and redirects the user back to the my polls list
   */
  deletePoll(): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, observe: 'response', withCredentials: true };
    // Send request
    this.http.delete<string>(env.apiBaseUrl + '/users/' + this.userData.id + '/polls/' + this.pollId, options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
          this.router.navigateByUrl('/dashboard/my-polls');
        }
      });
  }

  /**
   * Shows an error message with a custom message
   *
   * @param message Custom error message
   */
  showErrorMessage(message: string): void {
    this.notificationService.error('An error occurred', message, { nzPlacement: 'topRight' });
  }

  /**
   * Move poll items in poll item array
   *
   * @param event DragDrop Event
   */
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.poll.pollItems, event.previousIndex, event.currentIndex);
  }

  /**
   * Filter currently selected poll item from results
   *
   * @param pollId Id of the poll item
   */
  getChartData(pollId: number): any[] {
    return this.results.find(item => item.id === pollId).data;
  }

  /**
   * Calculate total answers on a poll item
   *
   * @param pollId Id of the poll item
   */
  getAnswersCount(pollId: number): number {
    return this.getChartData(pollId).reduce((sum, current) => sum + current.value, 0);
  }

  setupResultObserver(): void {
    this.results = [];
    this.poll.pollItems.forEach(pollItem => {
      this.results.push({
        id: pollItem.id,
        data: [
          {
            name: 'Noodles',
            value: 4
          },
          {
            name: 'Pizza',
            value: 10
          },
          {
            name: 'Burger',
            value: 11
          },
          {
            name: 'Rice',
            value: 4
          },
          {
            name: 'Vegetables',
            value: 5
          }
        ]
      });
    });
  }
}
