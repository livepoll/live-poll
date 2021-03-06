/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from './poll-item';
import {MultipleChoiceItemAnswer} from '../poll-item-answer/multiple-choice-item-answer';

/**
 * MultipleChoiceItemCreate class.
 * Represents a multiple choice question, which can have several possible answers.
 */
export class MultipleChoiceItemCreate extends PollItem {
  selectionOptions: MultipleChoiceItemAnswer[];

  public constructor(init?: Partial<MultipleChoiceItemCreate>) {
    super();
    Object.assign(this, init);
  }
}
