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
import {OpenTextItem} from '../model/open-text-item';
import {CommonToolsService} from './common-tools.service';

const ENDPOINT_URL = env.apiBaseUrl + '/poll-items';

@Injectable({
  providedIn: 'root'
})
export class PollItemService {

  /**
   * Initialize the service
   * @param http Injected http client
   * @param tools Injected CommonToolsService
   */
  constructor(
    private http: HttpClient,
    private tools: CommonToolsService
  ) {}

  /**
   * Creates a poll item on the server
   *
   * @param pollItem Poll item
   */
  create<T extends MultipleChoiceItem | QuizItem | OpenTextItem>(pollItem: T): Observable<T> {
    let endpointFraction = '';
    switch (pollItem.constructor) {
      case MultipleChoiceItem:
        endpointFraction = 'multiple-choice';
        break;
      case QuizItem:
        endpointFraction = 'quiz';
        break;
      case OpenTextItem:
        endpointFraction = 'open-text';
    }
    return this.http.post<T>(ENDPOINT_URL + `/${endpointFraction}`, pollItem, { withCredentials: true });
  }

  /**
   * Retrieves a poll item from the server
   *
   * @param id Id of the affected poll item
   */
  get(id: number): Observable<PollItem> {
    return this.http.get<PollItem>(ENDPOINT_URL + `/${id}`, { withCredentials: true });
  }

  /**
   * Updates a poll item on the server
   *
   * @param pollItem Affected poll item
   */
  update(pollItem: PollItem): Observable<void> {
    return this.http.put<void>(ENDPOINT_URL, pollItem, { withCredentials: true });
  }

  /**
   * Deletes a poll item from the server
   *
   * @param id Id of the affected poll item
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(ENDPOINT_URL + `/${id}`, { withCredentials: true });
  }
}
