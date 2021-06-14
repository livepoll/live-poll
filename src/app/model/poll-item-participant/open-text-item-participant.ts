/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from '../poll-item-create/poll-item';
import {OpenTextItemAnswerParticipant} from '../poll-item-answer-participant/open-text-item-answer-participant';

/**
 * OpenTextItemParticipant class.
 * Represents an open text question.
 */
export class OpenTextItemParticipant extends PollItem {
  position: number;
  answers: OpenTextItemAnswerParticipant[];

  public constructor(init?: Partial<OpenTextItemParticipant>) {
    super();
    Object.assign(this, init);
  }
}
