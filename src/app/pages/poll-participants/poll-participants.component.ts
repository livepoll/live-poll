/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Poll} from '../../model/poll';
import {MultipleChoiceItem} from '../../model/multiple-choice-item';
import {ItemType} from '../../model/poll-item';

@Component({
  selector: 'app-poll-participants',
  templateUrl: './poll-participants.component.html',
  styleUrls: ['./poll-participants.component.sass']
})
export class PollParticipantsComponent {

  // Variables
  poll: Poll = { id: 1, name: 'Test Poll', pollItems: [], currentItem: 1, slug: 'test', startDate: 0, endDate: 0 };
  activeItem: MultipleChoiceItem = {
    itemId: 1,
    pollId: 1,
    question: 'How did you like the presentation?',
    position: 1,
    type: ItemType.MultipleChoice,
    answers: [
      { selectionOption: 'Option 1', answerCount: 1 },
      { selectionOption: 'Option 2', answerCount: 10 },
      { selectionOption: 'Option 3', answerCount: 4 }
    ]
  };
  activeItemType: 'multiple-choice';
  answer = '';

  /**
   * Initialize component
   *
   * @param route Active route
   */
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe( params => console.log(params));

    // Connect to WebSocket
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(): void {

  }
}
