import { Question } from './question';

/**
 * RatingQuestion class.
 * Represents a rating question, where the user can rate between <min> and <max> stars.
 */
export class RatingQuestion extends Question {
  minStars: number;
  maxStars: number;
}
