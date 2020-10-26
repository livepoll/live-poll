import { Question } from './question';
import { Answer } from './answer';

export class QuizQuestion extends Question {
  answers: Answer[];
}
