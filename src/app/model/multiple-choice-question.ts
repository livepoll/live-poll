import { Question } from './question';
import { Answer } from './answer';

export class MultipleChoiceQuestion extends Question {
  answers: Answer[];
}
