/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
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
  ) {
  }

  /**
   * Retrieves the current user from the server
   */
  get(): Observable<HttpResponse<User>> {
    return this.http.get<User>(ENDPOINT_URL, {observe: 'response', responseType: 'json', withCredentials: true});
  }
}
