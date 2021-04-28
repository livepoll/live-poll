/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Poll} from '../../model/poll';
import {MultipleChoiceItem} from '../../model/multiple-choice-item';
import {ItemType} from '../../model/poll-item';
import {WebsocketService} from '../../service/websocket.service';

@Component({
  selector: 'app-poll-participants',
  templateUrl: './poll-participants.component.html',
  styleUrls: ['./poll-participants.component.sass']
})
export class PollParticipantsComponent implements OnInit, OnDestroy {

  // Variables
  slug = '';
  poll: Poll = {id: 1, name: 'Test Poll', pollItems: [], currentItem: 1, slug: 'test', startDate: 0, endDate: 0};
  activeItem: MultipleChoiceItem = {
    itemId: 1,
    pollId: 1,
    question: 'How did you like the presentation?',
    position: 1,
    type: ItemType.MultipleChoice,
    answers: [
      {selectionOption: 'Option 1', answerCount: 1},
      {selectionOption: 'Option 2', answerCount: 10},
      {selectionOption: 'Option 3', answerCount: 4}
    ]
  };
  activeItemType = 'multiple-choice';
  answer = -1;

  /**
   * Initialize component
   *
   * @param route Active route
   * @param websocketService Injected WebSocketService
   */
  constructor(
    private route: ActivatedRoute,
    private websocketService: WebsocketService
  ) {}

  /**
   * Initialize the participants page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params.slug;
      console.log(this.slug); // Test
      // Connect to WebSocket
      this.websocketService.establishConnection(this.slug);
    });
  }

  /**
   * Closes the websocket connection before leaving the site
   */
  ngOnDestroy(): void {
    this.websocketService.closeConnection();
  }
}
