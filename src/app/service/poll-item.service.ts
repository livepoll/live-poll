/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PollItem} from '../model/poll-item';
import {MultipleChoiceItem} from '../model/multiple-choice-item';
import {QuizItem} from '../model/quiz-item';

const ENDPOINT_URL = env.apiBaseUrl + '/poll-items';

@Injectable({
  providedIn: 'root'
})
export class PollItemService {

  /**
   * Initialize the service
   * @param http Injected http client
   */
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Creates a multiple choice poll item on the server
   *
   * @param pollItem Multiple choice item
   */
  createMultipleChoice(pollItem: MultipleChoiceItem): Observable<MultipleChoiceItem> {
    return this.http.post<MultipleChoiceItem>(ENDPOINT_URL, pollItem);
  }

  /**
   * Creates a quiz poll item on the server
   *
   * @param pollItem Quiz item
   */
  createQuiz(pollItem: QuizItem): Observable<QuizItem> {
    return this.http.post<QuizItem>(ENDPOINT_URL, pollItem);
  }

  /**
   * Retrieves a poll item from the server
   *
   * @param id Id of the affected poll item
   */
  get(id: number): Observable<PollItem> {
    return this.http.get<PollItem>(ENDPOINT_URL + `/${id}`);
  }

  /**
   * Retrieves all poll items of a specific poll from the server
   */
  getAll(): Observable<PollItem[]> {
    return this.http.get<PollItem[]>(ENDPOINT_URL);
  }

  /**
   * Updates a poll item on the server
   *
   * @param pollItem Affected poll item
   */
  update(pollItem: PollItem): Observable<void> {
    return this.http.put<void>(ENDPOINT_URL, pollItem);
  }

  /**
   * Deletes a poll item from the server
   *
   * @param id Id of the affected poll item
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(ENDPOINT_URL + `/${id}`);
  }
}
