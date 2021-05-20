/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Poll} from '../../model/poll';
import {MultipleChoiceItemCreate} from '../../model/poll-item/multiple-choice-item-create';
import {WebsocketService} from '../../service/websocket.service';
import {QuizItemCreate} from '../../model/poll-item/quiz-item-create';
import {OpenTextItemCreate} from '../../model/poll-item/open-text-item-create';
import {CommonToolsService} from '../../service/common-tools.service';
import {PollService} from '../../service/poll.service';
import {MultipleChoiceItemAnswerParticipant} from '../../model/poll-item-answer-participant/multiple-choice-item-answer-participant';
import {OpenTextItemAnswerParticipant} from '../../model/poll-item-answer-participant/open-text-item-answer-participant';
import {QuizItemAnswerParticipant} from '../../model/poll-item-answer-participant/quiz-item-answer-participant';

@Component({
  selector: 'app-poll-participants',
  templateUrl: './poll-participants.component.html',
  styleUrls: ['./poll-participants.component.sass']
})
export class PollParticipantsComponent implements OnInit, OnDestroy {

  // Variables
  slug = '';
  poll: Poll;
  activeItem: MultipleChoiceItemCreate|QuizItemCreate|OpenTextItemCreate;
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
      const subscription = this.websocketService.establishConnectionParticipant(this.slug);
      subscription.subscribe(pollItem => {
        if (Object.keys(pollItem).length > 1) {
          // Load poll
          if (!this.poll) {
            this.pollService.get(pollItem.pollId).subscribe(poll => {
              this.poll = poll;
              this.loading = false;
            }, (_) => {
              this.loading = false;
            });
          } else {
            this.poll.currentItem = pollItem.itemId;
          }
          // Randomize selection options if it is a quiz item
          if (pollItem instanceof QuizItemCreate) {
            pollItem.selectionOptions = this.toolsService.shuffleList(pollItem.selectionOptions);
          }
          // Update UI
          this.activeItemType = pollItem.type;
          delete pollItem.type;
          this.activeItem = pollItem;
        } else {
          // Load poll
          if (!this.poll) {
            this.pollService.get(pollItem.pollId).subscribe(poll => {
              this.poll = poll;
              this.loading = false;
            }, (_) => {
              this.loading = false;
            });
          } else {
            this.poll.currentItem = null;
          }
          this.activeItem = null;
          this.activeItemType = '';
        }
        // Check if already answered
        this.sent = localStorage.getItem('answered_' + this.activeItem?.itemId) !== null;
        this.answer = null;
      });
    });
  }

  sendAnswer(): void {
    let answerItem;
    switch (this.activeItemType) {
      case 'multiple-choice': {
        const activeItem = this.activeItem as MultipleChoiceItemCreate;
        answerItem = new MultipleChoiceItemAnswerParticipant();
        answerItem.id = activeItem.selectionOptions[this.answer].id;
        answerItem.selectionOption = activeItem.selectionOptions[this.answer].selectionOption;
        break;
      }
      case 'quiz': {
        const activeItem = this.activeItem as QuizItemCreate;
        answerItem = new QuizItemAnswerParticipant();
        answerItem.id = activeItem.selectionOptions[this.answer].id;
        answerItem.selectionOption = activeItem.selectionOptions[this.answer].selectionOption;
        break;
      }
      case 'open-text': {
        answerItem = new OpenTextItemAnswerParticipant();
        answerItem.answer = this.answer;
        break;
      }
    }
    if (this.websocketService.sendAnswer(this.activeItem.itemId, answerItem)) {
      localStorage.setItem('answered_' + this.activeItem.itemId, '1');
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
