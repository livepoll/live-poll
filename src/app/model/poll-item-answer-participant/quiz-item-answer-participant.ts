/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

/**
 * MultipleChoiceItemAnswerParticipant class.
 * Represents one possible answer for a multiple choice question.
 */
export class QuizItemAnswerParticipant {
  id: number;
  type = 'quiz';
  selectionOption: string;
}
