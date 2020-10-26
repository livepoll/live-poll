import { Question } from './question';
import { Answer } from './answer';

/**
 * QuizQuestion class.
 * Represents a quiz question. Quiz questions can have multiple possible answers.
 */
export class QuizQuestion extends Question {
  answers: Answer[];
}
