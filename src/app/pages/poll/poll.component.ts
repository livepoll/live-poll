/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter, Inject, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Poll} from '../../model/poll';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {User} from '../../model/user';
import {PollItem} from '../../model/poll-item';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {formatDate} from '@angular/common';

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
  pollStatus = 1; // 1 = Planned; 2 = Running; 3 = Finished
  showEditPollDialog = false;
  showEditPollItemDialog = false;

  /**
   * Initialize component
   *
   * @param activeRoute Injected active route
   * @param router Injected router
   * @param http Injected http client
   * @param notificationService Injected notification service
   * @param locale Injected local id
   */
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private notificationService: NzNotificationService,
    @Inject(LOCALE_ID) private locale: string
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
  onSnippetChange(url: string): void {
    if (!url || url.length === 0) return;
    const oldSnippet = this.poll.snippet;
    const newSnippet = this.poll.snippet = encodeURI(url.toLocaleLowerCase().split(' ').join('-'));
    // Commit changes to the server
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, observe: 'response', withCredentials: true };
    const body = { newSnippet };
    // Send request
    this.http.put<string>(env.apiBaseUrl + '/users/' + this.userData.id + '/polls/' + this.pollId + '/snippet', body, options)
      .subscribe((response: HttpResponse<string>) => {
        if (!response.ok) this.poll.snippet = oldSnippet;
      }, _ => this.poll.snippet = oldSnippet);
  }

  /**
   * Change the poll state on the server
   *
   * @param open Open = true; closed = false
   */
  changePollState(open: boolean): void {
    this.changingState = true;
    if (open) {
      this.poll.startDate = this.currentDate;
      if (this.poll.endDate.getTime() > 0) this.poll.endDate.setTime(0);
    } else {
      this.poll.endDate = this.currentDate;
    }
    this.updatePoll(() => {
      this.changingState = false;
      this.refreshPollStatus();
    }, () => {
      // TODO: Remove this later
      this.changingState = false;
      this.refreshPollStatus();
    });
  }

  /**
   * Is called when the NewPollItemDialog was closed. Triggers a poll reload, if the creation of an item was successful
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
    // Redirect to MyPolls page, if some data is missing to load the poll
    if (!this.userData || !this.pollId) {
      this.router.navigateByUrl('/dashboard/my-polls');
      return;
    }
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
          poll.snippet = json.snippet;
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
   * Deletes a single poll item from the server
   *
   * @param pollItemId Id of the poll item
   */
  deletePollItem(pollItemId: number): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, observe: 'response', withCredentials: true };
    // Send request
    this.http.delete<string>(env.apiBaseUrl + '/users/' + this.userData.id + '/polls/' + this.pollId + '/item/' + pollItemId, options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) this.loadPoll();
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

  /**
   * Calculates the status of the poll, based on the startDate and endDate
   */
  refreshPollStatus(): void {
    const startDate = this.poll.startDate;
    const endDate = this.poll.endDate;
    const currentDate = this.currentDate = new Date();

    if (
      (startDate.getTime() === 0 && endDate.getTime() === 0) || // Manual opening, manual closing
      (startDate > currentDate) // Start date not reached
    ) {
      // Poll is pending
      this.pollStatus = 1;
    } else if (
      (startDate <= currentDate && endDate > currentDate) || // We're in between of the two dates
      (startDate <= currentDate && endDate.getTime() === 0) // Started, manual closing
    ) {
      // Poll is running
      this.pollStatus = 2;
    } else if (
      (endDate < currentDate) // End date already reached
    ) {
      // Poll is finished
      this.pollStatus = 3;
    } else {
      // Invalid status, something went wrong
      this.pollStatus = 0;
    }
  }

  /**
   * Generates the subtitle string for the poll, consisting of either start and end date or placeholder strings.
   * The calculation is based on the status and the startDate and endDate
   */
  getSubtitle(): string {
    const startDate = this.poll.startDate;
    const endDate = this.poll.endDate;
    const startDateString = '<strong>' + formatDate(startDate, 'yyyy-MM-dd hh:mm a', this.locale) + '</strong>';
    const endDateString = '<strong>' + formatDate(endDate, 'yyyy-MM-dd hh:mm a', this.locale) + '</strong>';

    switch (this.pollStatus) {
      case 1: { // Pending
        if (startDate.getTime() === 0 && endDate.getTime() === 0) return 'Manual opening, manual closing';
        if (startDate.getTime() === 0) return 'Manual opening, automatically closing at' + endDateString;
        if (endDate.getTime() === 0) return 'Automatically opening at ' + startDateString + ', manual closing';
        return 'Automatically opening at ' + startDateString + ', automatically closing at ' + endDateString;
      }
      case 2: { // Running
        if (endDate.getTime() === 0) return 'Running since ' + startDateString + ', manual closing';
        return 'Running since ' + startDateString + ', automatically closing at ' + endDateString;
      }
      case 3: { // Finished
        return 'Poll ran from ' + startDateString + ' to ' + endDateString;
      }
      default: return ''; // Unknown state, return empty string
    }
  }

  openEditPollDialog(): void {
    // Open edit dialog
    this.showEditPollDialog = true;
  }

  openEditPollItemDialog(event: any): void {
    event.stopPropagation();
    // Open edit dialog
    this.showEditPollItemDialog = true;
  }

  /**
   * Establish socket connection to the server to ensure data exchange in realtime
   */
  setupResultObserver(): void {
    // TODO: Remove this mocked data later on
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
