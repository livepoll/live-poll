/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Question} from './question';

/**
 * Poll class.
 * Represents a poll. A poll can have a name a start and end date and hold several questions.
 */
export class Poll {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  questions: Question[];
}
