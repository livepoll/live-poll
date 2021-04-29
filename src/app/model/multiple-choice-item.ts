/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from './poll-item';
import {MultipleChoiceItemAnswer} from './multiple-choice-item-answer';

/**
 * MultipleChoiceItem class.
 * Represents a multiple choice question, which can have several possible answers.
 */
export class MultipleChoiceItem extends PollItem {
  answers: MultipleChoiceItemAnswer[];

  public constructor(init?: Partial<MultipleChoiceItem>) {
    super();
    Object.assign(this, init);
  }
}
