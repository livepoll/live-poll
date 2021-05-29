/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

/**
 * MultipleChoiceItemAnswerParticipant class.
 * Represents one possible answer for a multiple choice question.
 */
export class MultipleChoiceItemAnswerParticipant {
  id: number;
  type = 'multiple-choice';
  selectionOption: string;
}
