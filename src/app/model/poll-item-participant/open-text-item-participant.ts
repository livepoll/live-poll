/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from '../poll-item-create/poll-item';

/**
 * OpenTextItemParticipant class.
 * Represents an open text question.
 */
export class OpenTextItemParticipant extends PollItem {
  position: number;

  public constructor(init?: Partial<OpenTextItemParticipant>) {
    super();
    Object.assign(this, init);
  }
}
