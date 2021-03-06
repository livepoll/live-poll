/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from '../poll-item-create/poll-item';
import {QuizItemAnswer} from '../poll-item-answer/quiz-item-answer';

/**
 * QuizItemCreate class.
 * Represents a quiz question. Quiz questions can have multiple possible answers.
 */
export class QuizItemCreate extends PollItem {
  position: number;
  selectionOptions: QuizItemAnswer[];

  public constructor(init?: Partial<QuizItemCreate>) {
    super();
    Object.assign(this, init);
  }
}
