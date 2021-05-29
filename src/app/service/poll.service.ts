/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Poll} from '../model/poll';
import {Observable} from 'rxjs';
import {PollItem} from '../model/poll-item-create/poll-item';

const ENDPOINT_URL = env.apiBaseUrl + '/polls';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  /**
   * Initialize the service
   * @param http Injected http client
   */
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Creates a poll on the server
   *
   * @param poll Affected poll
   */
  create(poll: Poll): Observable<Poll> {
    return this.http.post<Poll>(ENDPOINT_URL, poll, { withCredentials: true });
  }

  /**
   * Retrieves a poll from the server
   *
   * @param id Id of the affected poll
   */
  get(id: number): Observable<Poll> {
    return this.http.get<Poll>(ENDPOINT_URL + `/${id}`, { withCredentials: true });
  }

  /**
   * Retrieves all polls of a specific user from the server
   */
  getAll(): Observable<Poll[]> {
    return this.http.get<Poll[]>(ENDPOINT_URL, { withCredentials: true });
  }

  /**
   * Retrieves all poll items of a specific poll from the server
   */
  getAllItems(pollId: number): Observable<PollItem[]> {
    return this.http.get<PollItem[]>(ENDPOINT_URL + `/${pollId}/poll-items`, { withCredentials: true });
  }

  /**
   * Updates a poll on the server
   *
   * @param poll Affected poll
   */
  update(poll: Poll): Observable<void> {
    return this.http.put<void>(ENDPOINT_URL + `/${poll.id}`, poll, { withCredentials: true });
  }

  /**
   * Deletes a poll from the server
   *
   * @param id Id of the affected poll
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(ENDPOINT_URL + `/${id}`, { withCredentials: true });
  }

  /**
   * Moves the presentation to the next poll item
   *
   * @param id Id of the affected poll
   */
  nextItem(id: number): Observable<PollItem> {
    return this.http.get<PollItem>(ENDPOINT_URL + `/${id}/next-item`, { withCredentials: true });
  }
}
