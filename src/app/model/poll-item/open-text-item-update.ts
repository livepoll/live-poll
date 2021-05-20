/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from './poll-item';

/**
 * OpenTextItemCreate class.
 * Represents an open text question.
 */
export class OpenTextItemCreate extends PollItem {
  position: number;

  public constructor(init?: Partial<OpenTextItemCreate>) {
    super();
    Object.assign(this, init);
  }
}
