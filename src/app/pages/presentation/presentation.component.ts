/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, OnInit} from '@angular/core';
import {Poll} from '../../model/poll';
import {MultipleChoiceItemCreate} from '../../model/poll-item-create/multiple-choice-item-create';
import {QuizItemCreate} from '../../model/poll-item-create/quiz-item-create';
import {OpenTextItemCreate} from '../../model/poll-item-create/open-text-item-create';
import {ActivatedRoute, Router} from '@angular/router';
import {PollService} from '../../service/poll.service';
import {WebsocketService} from '../../service/websocket.service';
import {CommonToolsService} from '../../service/common-tools.service';
import {ChartDataItem} from '../../model/chart-data-item';
import {MultipleChoiceItemParticipant} from '../../model/poll-item-participant/multiple-choice-item-participant';
import {QuizItemParticipant} from '../../model/poll-item-participant/quiz-item-participant';
import {OpenTextItemParticipant} from '../../model/poll-item-participant/open-text-item-participant';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.sass']
})
export class PresentationComponent implements OnInit {

  // Variables
  pollId = 0;
  poll: Poll;
  activeItem: MultipleChoiceItemCreate | QuizItemCreate | OpenTextItemCreate;
  pollOver = false;
  chartData: ChartDataItem[] = [];
  darkTheme: boolean;

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
  ) {
  }

  /**
   * Initialize the presenter view
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pollId = params.pollId;
      // Connect to WebSocket
      const subscription = this.websocketService.establishConnectionPresentation(this.pollId);
      subscription.subscribe(pollItem => {
        if (Object.keys(pollItem).length > 1) {
          // Update UI
          this.activeItem = pollItem;
          this.chartData = this.getChartData();
        } else {
          // Update UI
          this.activeItem = null;
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
    this.pollService.nextItem(this.poll.id).subscribe((pollItem) => {
      if (pollItem.result === 'Poll over') {
        this.pollOver = true;
      } else {
        this.activeItem = pollItem;
        this.poll.currentItem = pollItem.itemId;
        this.chartData = this.getChartData();
      }
    });
  }

  /**
   * Go back to dashboard to edit the poll
   */
  backToDashboard(): void {
    this.router.navigateByUrl('/dashboard/my-polls/poll/' + this.pollId);
  }

  /**
   * Returns data for the chart of answers
   */
  getChartData(): ChartDataItem[] {
    const items: ChartDataItem[] = [];
    switch (this.activeItem.type) {
      case 'multiple-choice': {
        const activeItem = this.activeItem as MultipleChoiceItemParticipant;
        activeItem.answers.forEach((answer) => {
          const item = new ChartDataItem();
          item.name = answer.selectionOption;
          item.value = answer.answerCount;
          items.push(item);
        });
        break;
      }
      case 'quiz': {
        const activeItem = this.activeItem as QuizItemParticipant;
        activeItem.answers.forEach((answer) => {
          const item = new ChartDataItem();
          item.name = answer.selectionOption;
          item.value = answer.answerCount;
          items.push(item);
        });
        break;
      }
      case 'open-text': {
        const activeItem = this.activeItem as OpenTextItemParticipant;
        break;
      }
    }
    JSON.stringify(items);
    return items;
  }
}
