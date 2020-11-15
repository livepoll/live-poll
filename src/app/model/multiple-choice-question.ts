/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Question} from './question';
import {Answer} from './answer';

/**
 * MultipleChoiceQuestion class.
 * Represents a multiple choice question, which can have several possible answers.
 */
export class MultipleChoiceQuestion extends Question {
  answers: Answer[];
}
