/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment as env} from '../environments/environment';
import {NgcCookieConsentService} from 'ngx-cookieconsent';
import {User} from './model/user';
import {CommonToolsService} from './service/common-tools.service';
import {UserService} from './service/user.service';
import {AccountService} from './service/account.service';

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
  user: User;

  /**
   * Initialize app component
   *
   * @param cookieService Injected cookie service
   * @param router Injected router
   * @param tools Injected ToolsService
   * @param accountService Injected AccountService
   * @param userService Injected UserService
   * @param _ Injected CookieConsent manager (do not remove this import)
   */
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private tools: CommonToolsService,
    private accountService: AccountService,
    private userService: UserService,
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
      if (this.user) this.onUserDataChanged.emit(this.user);
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
    this.userService.get().subscribe((response) => {
      this.user = response.body;
      // Redirect to dashboard if necessary, otherwise apply userData to dashboard
      if (location.href.includes('dashboard') || location.href.includes('/p/')) {
        if (this.onUserDataChanged) this.onUserDataChanged.emit(this.user);
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    }, (err) => {
      console.log(err);
      if (showErrorExplicitly) {
        this.tools.showErrorMessage('Loading user data failed.');
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
    const body = { username, password };
    this.accountService.login(body).subscribe((_) => {
      // Load user data
      this.loadUserData(true);
    }, (error) => {
      this.tools.showErrorMessage('Login failed.');
      console.log(error);
      this.onLoginResultChanged.emit(error);
    });
  }

  /**
   * Executes the logout of the current user
   */
  logout(): void {
    this.accountService.logout(this.user).subscribe((_) => {
      // Redirect to login page
      this.router.navigateByUrl('/login');
    }, (_) => {
      this.tools.showErrorMessage('Logout failed.');
    });
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
      this.applyTheme('dark');
    } else {
      // Remove dark theme
      const dom = document.getElementById('light-theme');
      if (dom) dom.remove();
      // Apply light theme
      this.applyTheme('light');
    }
  }

  /**
   * Sets a theme to the app
   *
   * @param name Name of the theme. Either 'light' or 'dark'
   */
  applyTheme(name: string): void {
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = `${name}-theme`;
    style.href = `assets/themes/${name}.css`;
    document.body.appendChild(style);
  }
}
