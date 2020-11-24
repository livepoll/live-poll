/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Poll} from '../../model/poll';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent {

  // Event Emitters
  onPollsChanged = new EventEmitter<Poll[]>();

  // Variables
  polls: Poll[];
  poll: Poll;
  pollId: number;
  changingState = false;

  /**
   * Initialize component
   *
   * @param activeRoute Injected active route
   * @param router Injected router
   */
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    // Subscribe to own event emitters
    this.onPollsChanged.subscribe(polls => {
      this.polls = polls;
      if (this.pollId && polls?.length > 0) this.setSelectedPoll();
    });
    this.activeRoute.params.subscribe( params => {
      this.pollId = params.id;
      if (this.polls?.length > 0) this.setSelectedPoll();
    });
  }

  /**
   * Is called when the user clicks back in the poll detail view to come back to the poll list
   */
  onBack(): void {
    this.router.navigateByUrl('/dashboard/my-polls');
  }

  /**
   * Filter out the currently active poll and assign it to the poll variable
   */
  setSelectedPoll(): void {
    this.poll = this.polls.filter(poll => poll.id == this.pollId)[0]; // Has to be == and not ===
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
}
