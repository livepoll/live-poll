/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

/**
 * PollItem class.
 * Represents a question / poll item within a poll. It holds the question itself and a position for ordering the questions.
 */
export class PollItem {
  itemId: number;
  pollId: number;
  question: string;
  type: ItemType;
}

/**
 * Item type enumeration.
 * Represents the type of a poll item.
 */
export enum ItemType {
  MultipleChoice = 'multiple-choice',
  Quiz = 'quiz',
  OpenText = 'open-text',
  WordCloud = 'word-cloud',
  Rating = 'rating'
}
