/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter, Inject, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Poll} from '../../model/poll';
import {User} from '../../model/user';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {formatDate} from '@angular/common';
import {CommonToolsService} from '../../service/common-tools.service';
import {PollService} from '../../service/poll.service';
import {PollItemService} from '../../service/poll-item.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent {

  // Constants
  host = location.protocol + '//' + location.host;
  currentDate = new Date().getTime();

  // Event Emitters
  onUserDataChanged = new EventEmitter<User>();
  onReloadPolls = new EventEmitter();

  // Variables
  userData: User;
  poll: Poll;
  pollId: number;
  changingState = false;
  loadingRunPollItemId = 0;
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
   * @param pollService Injected PollService
   * @param pollItemService Injected PollItemService
   * @param tools Injected ToolsService
   * @param locale Injected local id
   */
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private pollService: PollService,
    private pollItemService: PollItemService,
    private tools: CommonToolsService,
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
      this.currentDate = new Date().getTime();
    }, 1000);
  }

  /**
   * Is called when the user clicks back in the poll detail view to come back to the poll list
   */
  onBack(): void {
    this.onReloadPolls.emit();
    this.router.navigateByUrl('/dashboard/my-polls');
  }

  /**
   * Transforms the user input to a valid url fragment
   *
   * @param url Customized input url
   */
  onSlugChange(url: string): void {
    if (!url || url.length === 0) return;
    const oldSlug = this.poll.slug;
    this.poll.slug = encodeURI(url.toLocaleLowerCase().split(' ').join('-'));

    // Commit changes to the server
    this.pollService.update(this.poll).subscribe((_) => {}, (_) => {
      this.poll.slug = oldSlug;
    });
  }

  /**
   * Update the current poll item for this poll on the server
   *
   * @param event Click event
   * @param pollItemId Id of the poll item
   */
  onRunPollItem(event: MouseEvent, pollItemId: number): void {
    event.stopPropagation();
    const oldPollItem = this.poll.currentItem;
    this.poll.currentItem = this.loadingRunPollItemId = pollItemId === this.poll.currentItem ? null : pollItemId;
    this.pollService.update(this.poll).subscribe((_) => {
      this.loadingRunPollItemId = -1;
    }, (_) => {
      this.poll.currentItem = oldPollItem;
      this.loadingRunPollItemId = -1;
      this.tools.showErrorMessage('Something went wrong. Please try again');
    });
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
      if (this.poll.endDate) this.poll.endDate = null;
    } else {
      this.poll.endDate = this.currentDate;
    }
    this.updatePoll(() => {
      this.changingState = false;
      this.pollStatus = this.tools.getPollStatus(this.poll);
    }, () => {
      // TODO: Remove this later
      this.changingState = false;
      this.pollStatus = this.tools.getPollStatus(this.poll);
    });
  }

  /**
   * Opens a separate page for the presenter
   */
  openPresenterView(): void {
    this.router.navigateByUrl('/r/' + this.poll.id);
  }

  /**
   * Is called when the NewPollItemDialog or the EditPollItemDialog was closed.
   * Triggers a poll reload, if the creation of an item was successful
   *
   * @param success Item successfully created / edited
   */
  handleDialogClose(success: boolean): void {
    if (success) this.loadPoll();
    this.showNewPollItemDialog = false;
    this.showEditPollDialog = false;
    this.showEditPollItemDialog = false;
  }

  /**
   * Loads a single poll from the server
   */
  loadPoll(): void {
    // Redirect to MyPolls page, if some data is missing to load the poll
    if (!this.userData || !this.pollId) {
      this.onBack();
      return;
    }

    this.pollService.get(this.pollId).subscribe((poll) => {
      this.poll = poll;
      this.pollService.getAllItems(poll.id).subscribe(items => {
        this.poll.pollItems = items;
        this.setupResultObserver();
      }, (_) => {
        this.error = true;
        this.tools.showErrorMessage('Something went wrong, loading the poll items.');
      });
    }, (_) => {
      this.error = true;
      this.tools.showErrorMessage('Something went wrong, loading the poll.');
    });
  }

  /**
   * Commits the poll object to the server
   */
  updatePoll(callback: () => void, error?: () => void): void {
    error = error ?? function(): void {
      this.tools.showErrorMessage('The change could not be committed onto the server. Please try again later.');
    };

    this.pollService.update(this.poll).subscribe(callback, error);
  }

  /**
   * Deletes the current poll from the server and redirects the user back to the my polls list
   */
  deletePoll(): void {
    this.pollService.delete(this.pollId).subscribe((_) => {
      this.onBack();
    }, (_) => {
      this.tools.showErrorMessage('An error occurred while deleting the poll.');
    });
  }

  /**
   * Deletes a single poll item from the server
   *
   * @param id Id of the poll item
   */
  deletePollItem(id: number): void {
    this.pollItemService.delete(id).subscribe((_) => this.loadPoll(), (_) => this.loadPoll());
  }

  /**
   * Move poll items in poll item array
   *
   * @param event DragDrop Event
   */
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.poll.pollItems, event.previousIndex, event.currentIndex);
    // Update position on server
    // TODO: Ask team what to do when dropping item, because I would have to do a API request for every position update
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
        if (!startDate && !endDate) return 'Manual opening, manual closing';
        if (!startDate) return 'Manual opening, auto closing at' + endDateString;
        if (!endDate) return 'Auto opening at ' + startDateString + ', manual closing';
        return 'Auto opening at ' + startDateString + ', auto closing at ' + endDateString;
      }
      case 2: { // Running
        if (!endDate) return 'Running since ' + startDateString + ', manual closing';
        return 'Running since ' + startDateString + ', auto closing at ' + endDateString;
      }
      case 3: { // Finished
        return 'Ran from ' + startDateString + ' to ' + endDateString;
      }
      default: return ''; // Unknown state, return empty string
    }
  }

  /**
   * Shows the dialog for editing the current poll
   */
  openEditPollDialog(): void {
    // Open edit dialog
    this.showEditPollDialog = true;
  }

  /**
   * Shows the dialog a specific poll item
   */
  openEditPollItemDialog(event: MouseEvent): void {
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
        id: pollItem.itemId,
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
