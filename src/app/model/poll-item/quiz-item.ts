/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from './poll-item';
import {QuizItemAnswer} from '../poll-item-answer/quiz-item-answer';

/**
 * QuizItem class.
 * Represents a quiz question. Quiz questions can have multiple possible answers.
 */
export class QuizItem extends PollItem {
  answers: QuizItemAnswer[];

  public constructor(init?: Partial<QuizItem>) {
    super();
    Object.assign(this, init);
  }
}
