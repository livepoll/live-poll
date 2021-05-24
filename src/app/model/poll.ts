/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {PollItem} from './poll-item-create/poll-item';

/**
 * Poll class.
 * Represents a poll. A poll can have a name a start and end date and hold several questions.
 */
export class Poll {
  id: number;
  name: string;
  startDate: number;
  endDate: number;
  slug: string;
  currentItem: number;
  pollItems: PollItem[];
}
