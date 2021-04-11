/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

const ENDPOINT_URL = env.apiBaseUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Initialize the service
   * @param http Injected http client
   */
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Retrieves a user from the server
   *
   * @param id Id of the user
   */
  get(id: number): Observable<User> {
    return this.http.get<User>(ENDPOINT_URL + `/${id}`);
  }
}
