/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, OnInit} from '@angular/core';
import {Poll} from '../../model/poll';
import {MultipleChoiceItemCreate} from '../../model/poll-item/multiple-choice-item-create';
import {QuizItemCreate} from '../../model/poll-item/quiz-item-create';
import {OpenTextItemCreate} from '../../model/poll-item/open-text-item-create';
import {ActivatedRoute, Router} from '@angular/router';
import {PollService} from '../../service/poll.service';
import {WebsocketService} from '../../service/websocket.service';
import {CommonToolsService} from '../../service/common-tools.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.sass']
})
export class PresentationComponent implements OnInit {

  // Variables
  pollId = 0;
  poll: Poll;
  activeItem: MultipleChoiceItemCreate|QuizItemCreate|OpenTextItemCreate;
  activeItemType = '';

  /**
   * Initialize component
   *
   * @param router Injected router
   * @param route Active route
   * @param pollService Injected PollService
   * @param websocketService Injected WebSocketService
   * @param toolsService Injected CommonToolsService
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pollService: PollService,
    private websocketService: WebsocketService,
    private toolsService: CommonToolsService
  ) {}

  /**
   * Initialize the presenter view
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pollId = params.pollId;
      // Connect to WebSocket
      const subscription = this.websocketService.establishConnectionPresentation(this.pollId);
      subscription.subscribe(pollItem => {
        console.log('PollItem' + pollItem);
        if (Object.keys(pollItem).length > 1) {
          // Update UI
          this.activeItemType = pollItem.type;
          delete pollItem.type;
          this.activeItem = pollItem;
        } else {
          // Update UI
          this.activeItem = null;
          this.activeItemType = '';
        }
      });
      // Load poll
      this.pollService.get(this.pollId).subscribe(poll => this.poll = poll);
    });
  }

  /**
   * Moves to the next poll item, defined by the poll item order
   */
  next(): void {

  }

  /**
   * Go back to dashboard to edit the poll
   */
  backToDashboard(): void {
    this.router.navigateByUrl('/dashboard/my-polls/poll/' + this.pollId);
  }
}
