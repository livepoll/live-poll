/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment as env} from '../environments/environment';

import jwt_decode from 'jwt-decode';
import {NgcCookieConsentService} from 'ngx-cookieconsent';

// Constants
const COOKIE_NAME_SESSION = 'SESSION_ID';
const COOKIE_NAME_THEME = 'THEME';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  currentPage: any;
  darkTheme = false;
  jwtToken = '';
  shouldRedirect = false;

  /**
   * Initialize app component
   *
   * @param cookieService Injected cookie service
   * @param http Injected http client
   * @param router Injected router
   * @param _ Injected CookieConsent manager (do not remove this import)
   */
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private _: NgcCookieConsentService
  ) {}

  /**
   * Initialize application:
   * - Set theme if cookie exist
   * - Auto-Redirect if cookie exists
   */
  ngOnInit(): void {
    this.applyPersistedTheme();
    this.redirectIfTokenExists();
  }

  /**
   * Establishes the communication through the router outlet
   *
   * @param componentReference Reference of the currently opened page within the router
   */
  onActivate(componentReference): void {
    this.currentPage = componentReference;
    // Redirect if token was loaded successfully
    if (this.shouldRedirect && !this.router.url.includes('/dashboard')) this.router.navigateByUrl('/dashboard');
    // Apply current theme
    if (this.currentPage.darkTheme !== null) this.currentPage.darkTheme = this.darkTheme;
    // Attach jwt token
    if (this.currentPage.jwtToken !== null) this.currentPage.jwtToken = this.jwtToken;
    // Subscribe to child methods
    componentReference.changeTheme?.subscribe(darkTheme => this.changeTheme(darkTheme));  // Change theme event
    componentReference.login?.subscribe(user =>  // Login trigger event
      this.login(user.username, user.password, user.accountState === 1)
    );
  }

  /**
   * Applies the theme, saved in the cookie
   */
  applyPersistedTheme(): void {
    this.darkTheme = this.cookieService.get(COOKIE_NAME_THEME) === 'dark';
    if (this.darkTheme) this.changeTheme(true);
  }

  /**
   * Executes auto-login if cookie exists
   *
   * Cookie structure: <preamble>;<username>;<password>
   */
  redirectIfTokenExists(): void {
    if (this.cookieService.check(COOKIE_NAME_SESSION)) {
      this.jwtToken = this.cookieService.get(COOKIE_NAME_SESSION);
      this.shouldRedirect = true;
    } else this.jwtToken = '';
  }

  /**
   * Executes the login and JWT token retrieval process on the server
   *
   * @param username Username of the user
   * @param password Password of the user (SHA256 hashed)
   * @param remember Remember user
   */
  login(username: string, password: string, remember: boolean): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'text', observe: 'response' };
    const body = { username, password };
    // Send request
    this.http.post<string>(env.apiBaseUrl + '/authenticate', body, options).subscribe((response: HttpResponse<string>) => {
      if (response.ok) {
        // Request was successful, continue
        this.jwtToken = response.body;
        // Save token in a secure cookie, if remember checkbox was checked
        if (remember) {
          const expirationDate = this.getTokenExpirationDate(this.jwtToken);
          this.cookieService.set(COOKIE_NAME_SESSION, this.jwtToken,
            { secure: env.useSecureCookies, path: '/', sameSite: 'Strict', expires: expirationDate });
        }
        // Redirect to dashboard
        this.router.navigateByUrl('/dashboard');
      } else {
        console.log('Login error', response.statusText);
      }
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
      const dom = document.getElementById('light-theme');
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
      const dom = document.getElementById('dark-theme');
      if (dom) dom.remove();
      // Apply light theme
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'dark-theme';
      style.href = 'assets/themes/light.css';
      document.body.appendChild(style);
    }
  }

  /**
   * Decode the jwt token and calculate the expiration date.
   * Used for setting the same expiration date to the secure cookie.
   *
   * @param token JWT token as string
   */
  getTokenExpirationDate(token: string): Date {
    const tokenData = jwt_decode(token) as any;
    if (tokenData.exp !== undefined) {
      const date = new Date(0);
      date.setUTCSeconds(tokenData.exp);
      return date;
    }
    return null;
  }
}
