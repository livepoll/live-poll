/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Poll} from '../model/poll';
import {Observable} from 'rxjs';

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
   * Updates a poll on the server
   *
   * @param poll Affected poll
   */
  update(poll: Poll): Observable<void> {
    return this.http.put<void>(ENDPOINT_URL, poll, { withCredentials: true });
  }

  /**
   * Deletes a poll from the server
   *
   * @param id Id of the affected poll
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(ENDPOINT_URL + `/${id}`, { withCredentials: true });
  }
}
