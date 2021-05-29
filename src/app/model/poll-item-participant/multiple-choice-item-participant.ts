/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from '../poll-item-create/poll-item';
import {MultipleChoiceItemAnswer} from '../poll-item-answer/multiple-choice-item-answer';

/**
 * MultipleChoiceItemParticipant class.
 * Represents a multiple choice question, which can have several possible answers.
 */
export class MultipleChoiceItemParticipant extends PollItem {
  position: number;
  answers: MultipleChoiceItemAnswer[];

  public constructor(init?: Partial<MultipleChoiceItemParticipant>) {
    super();
    Object.assign(this, init);
  }
}
