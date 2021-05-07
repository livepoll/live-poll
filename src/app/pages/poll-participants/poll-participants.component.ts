/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Poll} from '../../model/poll';
import {MultipleChoiceItem} from '../../model/multiple-choice-item';
import {WebsocketService} from '../../service/websocket.service';
import {QuizItem} from '../../model/quiz-item';
import {OpenTextItem} from '../../model/open-text-item';
import {CommonToolsService} from '../../service/common-tools.service';
import {PollService} from '../../service/poll.service';
import {MultipleChoiceItemAnswerParticipant} from '../../model/multiple-choice-item-answer-participant';

@Component({
  selector: 'app-poll-participants',
  templateUrl: './poll-participants.component.html',
  styleUrls: ['./poll-participants.component.sass']
})
export class PollParticipantsComponent implements OnInit, OnDestroy {

  // Variables
  slug = '';
  poll: Poll;
  activeItem: MultipleChoiceItem|QuizItem|OpenTextItem;
  activeItemType = '';
  answer = null;
  sent = false;
  loading = true;

  /**
   * Initialize component
   *
   * @param route Active route
   * @param pollService Injected PollService
   * @param websocketService Injected WebSocketService
   * @param toolsService Injected CommonToolsService
   */
  constructor(
    private route: ActivatedRoute,
    private pollService: PollService,
    private websocketService: WebsocketService,
    private toolsService: CommonToolsService
  ) {}

  /**
   * Initialize the participants page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params.slug;
      // Connect to WebSocket
      const subscription = this.websocketService.establishConnection(this.slug);
      subscription.subscribe(pollItem => {
        // Load poll
        if (!this.poll) this.pollService.get(pollItem.pollId).subscribe(poll => this.poll = poll);
        // Randomize selection options if it is a quiz item
        if (pollItem.type === 'quiz') {
          pollItem.answers = this.toolsService.shuffleList(pollItem.answers);
        }
        // Update UI
        this.activeItemType = pollItem.type;
        delete pollItem.type;
        this.activeItem = pollItem;
        this.sent = false;
        this.loading = false;
      });
    });
  }

  sendAnswer(): void {
    let answerItem;
    switch (this.activeItemType) {
      case 'multiple-choice': {
        const activeItem = this.activeItem as MultipleChoiceItem;
        answerItem = new MultipleChoiceItemAnswerParticipant();
        answerItem.id = activeItem.answers[this.answer].id;
        answerItem.selectionOption = activeItem.answers[this.answer].selectionOption;
        break;
      }
      case 'quiz': {
        const activeItem = this.activeItem as QuizItem;
        /*answerItem = new QuizItemAnswer();
        answerItem = activeItem.itemId;
        answerItem.selectionOption = activeItem.answers[this.answer].selectionOption;*/
        break;
      }
      case 'open-text': {
        /*answerItem = new OpenTextItemAnswer();
        answerItem.answer = this.answer;*/
        break;
      }
    }
    if (this.websocketService.sendAnswer(this.activeItem.itemId, answerItem)) {
      this.sent = true;
      this.answer = null;
    } else {
      this.toolsService.showErrorMessage('Could not send answer. Please try again. If the problem occurs again, please try to reload the page.');
    }
  }

  /**
   * Closes the websocket connection before leaving the site
   */
  ngOnDestroy(): void {
    this.websocketService.closeConnection();
  }
}
