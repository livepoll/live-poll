/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Poll} from '../../model/poll';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit {

  onPollChanged = new EventEmitter<Poll>();
  poll: Poll;

  /**
   * Initialize component
   *
   * @param router Injected router module
   */
  constructor(
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to parent event emitters
    this.onPollChanged.subscribe(poll => this.poll = poll);
  }

}
