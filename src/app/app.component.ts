/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment as env} from '../environments/environment';
import {NgcCookieConsentService} from 'ngx-cookieconsent';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {User} from './model/user';

// Constants
const COOKIE_NAME_THEME = 'theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  // Event Emitters
  onUserDataChanged: EventEmitter<User>;
  onLoginResultChanged: EventEmitter<string>;

  // Variables
  currentPage: any;
  darkTheme = false;
  userData: User;

  /**
   * Initialize app component
   *
   * @param cookieService Injected cookie service
   * @param http Injected http client
   * @param router Injected router
   * @param notificationService Injected notification service
   * @param _ Injected CookieConsent manager (do not remove this import)
   */
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private notificationService: NzNotificationService,
    private _: NgcCookieConsentService
  ) {}

  /**
   * Initialize application:
   * - Set theme if cookie exist
   * - Auto-Redirect if cookie exists
   */
  ngOnInit(): void {
    this.applyPersistedTheme();
    this.loadUserData(false);
  }

  /**
   * Establishes the communication through the router outlet
   *
   * @param child Reference of the currently opened page within the router
   */
  onActivate(child): void {
    this.currentPage = child;
    // Wire up Attributes
    if (child.darkTheme !== null) child.darkTheme = this.darkTheme;
    // Wire up Event Emitters
    if (child.onUserDataChanged) {
      this.onUserDataChanged = child.onUserDataChanged;
      if (this.userData) this.onUserDataChanged.emit(this.userData);
    }
    if (child.onLoginResultChanged) {
      this.onLoginResultChanged = child.onLoginResultChanged;
    }
    if (child.onLogout) {
      child.onLogout.subscribe(_ => this.logout());
    }
    if (child.onChangeTheme) {
      child.onChangeTheme.subscribe(dark => this.changeTheme(dark));
    }
    if (child.onLogin) {
      child.onLogin.subscribe(user => this.login(user.username, user.password, user.accountState === 1));
    }
  }

  /**
   * Applies the theme, saved in the cookie
   */
  applyPersistedTheme(): void {
    this.darkTheme = this.cookieService.get(COOKIE_NAME_THEME) === 'dark';
    if (this.darkTheme) this.changeTheme(true);
  }

  /**
   * Tries to retrieve the user data from the server
   * If the request fails with a http error 403, then the user has to log in first
   */
  loadUserData(showErrorExplicitly: boolean): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'application/json', observe: 'response', withCredentials: true };
    // Send request
    this.http.get<string>(env.apiBaseUrl + '/authenticate/init', options).subscribe((response: HttpResponse<string>) => {
      const user = JSON.parse(response.body);
      // Build user object
      this.userData = new User();
      this.userData.id = user.id;
      this.userData.username = user.username;
      this.userData.email = user.email;
      // Redirect to dashboard if necessary, otherwise apply userData to dashboard
      if (location.href.includes('dashboard')) {
        if (this.onUserDataChanged) this.onUserDataChanged.emit(this.userData);
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    }, (_) => {
      if (showErrorExplicitly) {
        this.showErrorMessage('Loading user data failed.');
      } else {
        if (location.href.includes('dashboard')) this.router.navigateByUrl('/login');
      }
    });
  }

  /**
   * Executes the login and JWT cookie retrieval process on the server
   *
   * @param username Username of the user
   * @param password Password of the user (SHA256 hashed)
   * @param remember Remember user
   */
  login(username: string, password: string, remember: boolean): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'text', observe: 'response', withCredentials: true };
    const body = { username, password };
    // Send request
    this.http.post<string>(env.apiBaseUrl + '/authenticate/login', body, options).subscribe((_: HttpResponse<string>) => {
      // Load user data
      this.loadUserData(true);
    }, (error) => {
      this.showErrorMessage('Login failed.');
      console.log(error);
      this.onLoginResultChanged.emit(error);
    });
  }

  /**
   * Executes the logout of the current user
   */
  logout(): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'text', observe: 'response', withCredentials: true };
    // Send request
    this.http.put<string>(env.apiBaseUrl + '/authenticate/logout', null, options).subscribe((_: HttpResponse<string>) => {
      // Redirect to login page
      this.router.navigateByUrl('/login');
    }, (_) => {
      this.showErrorMessage('Logout failed.');
    });
  }

  /**
   * Shows an error message with a custom message
   *
   * @param message Custom error message
   */
  showErrorMessage(message: string): void {
    this.notificationService.error('An error occurred', message, { nzPlacement: 'topRight' });
  }

  /**
   * Changes the theme of the app. There are two available themes:
   * light and dark.
   *
   * @param darkTheme True for dark theme, false for light theme
   */
  changeTheme(darkTheme: boolean): void {
    // Set cookie
    this.cookieService.set(COOKIE_NAME_THEME, darkTheme ? 'dark' : 'light',
      { secure: env.useSecureCookies, path: '/', sameSite: 'Strict' });
    // Change theme
    this.darkTheme = darkTheme;
    if (darkTheme) {
      // Remove light theme
      const dom = document.getElementById('dark-theme');
      if (dom) dom.remove();
      // Apply dark theme
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'dark-theme';
      style.href = 'assets/themes/dark.css';
      document.body.appendChild(style);
    } else {
      // Remove dark theme
      const dom = document.getElementById('light-theme');
      if (dom) dom.remove();
      // Apply light theme
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'light-theme';
      style.href = 'assets/themes/light.css';
      document.body.appendChild(style);
    }
  }
}
