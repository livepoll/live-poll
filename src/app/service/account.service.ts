/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {environment as env} from '../../environments/environment';

const ENDPOINT_URL = env.apiBaseUrl + '/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /**
   * Initialize the service
   * @param http Injected http client
   */
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Confirms a user email using a registration token
   *
   * @param token Registration token
   */
  confirm(token: string): Observable<string> {
    return this.http.get<string>(ENDPOINT_URL + `/confirm?token=${token}`);
  }

  /**
   * Returns a user and sets the cookie
   *
   * @param user Affected user
   */
  login(user: object): Observable<User> {
    return this.http.post<User>(ENDPOINT_URL + `/login`, user, { withCredentials: true });
  }

  /**
   * Logs out a user and deletes the cookie
   *
   * @param user Affected user
   */
  logout(user: User): Observable<void> {
    return this.http.put<void>(ENDPOINT_URL + `/logout`, user, { withCredentials: true });
  }

  /**
   * Requests a password reset on the server
   *
   * @param username Username of the affected user
   */
  reset(username: string): Observable<void> {
    return this.http.get<void>(ENDPOINT_URL + `/reset/${username}`);
  }

  /**
   * Creates a user on the server and sends a confirmation mail
   *
   * @param user Affected user
   */
  register(user: object): Observable<string> {
    return this.http.post<string>(ENDPOINT_URL + `/register`, user, { observe: 'body', responseType: 'text' as 'json' });
  }
}
