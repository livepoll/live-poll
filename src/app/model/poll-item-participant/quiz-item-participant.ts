/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from '../poll-item-create/poll-item';
import {QuizItemAnswer} from '../poll-item-answer/quiz-item-answer';

/**
 * QuizItemParticipant class.
 * Represents a quiz question. Quiz questions can have multiple possible answers.
 */
export class QuizItemParticipant extends PollItem {
  position: number;
  answers: QuizItemAnswer[];

  public constructor(init?: Partial<QuizItemParticipant>) {
    super();
    Object.assign(this, init);
  }
}
