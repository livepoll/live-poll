import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';

const API_BASE_URL = 'https://dev.api.live-poll.de';
// const API_BASE_URL = 'http://localhost:8080';
const AES_KEY = '1234567890';
const PREAMBLE = 'lp-preamble';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  currentPage: any;
  darkTheme = false;
  sessionToken = '';

  /**
   * Initialize app component
   *
   * @param cookieService Injected cookie service
   * @param http Injected http client
   * @param router Injected router
   */
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Initialize application
   * - Auto-login if cookie exists
   * - Set theme if cookie exist
   */
  ngOnInit(): void {
    this.loginIfCookieExists();
    this.applyPersistedTheme();
  }

  /**
   * Establishes the communication through the router outlet
   *
   * @param componentReference Reference of the currently opened page within the router
   */
  onActivate(componentReference): void {
    this.currentPage = componentReference;
    // Apply current theme
    if (this.currentPage.darkTheme !== null) this.currentPage.darkTheme = this.darkTheme;
    // Subscribe to child methods
    componentReference.changeTheme?.subscribe(darkTheme => this.changeTheme(darkTheme));  // Change theme event
    componentReference.login?.subscribe(user =>  // Login trigger event
      this.saveCookieAndLogin(user.username, user.password, user.accountState === 1)
    );
  }

  /**
   * Applies the theme, saved in the cookie
   */
  applyPersistedTheme(): void {
    this.darkTheme = this.cookieService.get('theme') === 'dark';
    if (this.darkTheme) this.changeTheme(true);
  }

  /**
   * Executes auto-login if cookie exists
   *
   * Cookie structure: <preamble>;<username>;<password>
   */
  loginIfCookieExists(): void {
    const userData = CryptoJS.AES.decrypt(this.cookieService.get('user'), AES_KEY).toString(CryptoJS.enc.Utf8).split(';');
    const [ preamble, username, password ] = userData;
    if (preamble === PREAMBLE && username.length > 0 && password.length > 0) {
      // Valid user data, continue with login
      this.login(username, password);
    }
  }

  /**
   * Set cookie with user data and execute login afterwards
   *
   * Cookie structure: <preamble>;<username>;<password>
   *
   * @param username Username of the user
   * @param password Password of the user (SHA256 hashed)
   * @param remember Set cookie or not?
   */
  saveCookieAndLogin(username: string, password: string, remember: boolean): void {
    // Set cookie, if necessary
    if (remember) {
      const userDataString = PREAMBLE + ';' + username + ';' + password;
      this.cookieService.set('user', CryptoJS.AES.encrypt(userDataString, AES_KEY).toString());
    }
    // Login
    this.login(username, password);
  }

  /**
   * Executes the login and JWT token retrieval process on the server
   *
   * @param username Username of the user
   * @param password Password of the user (SHA256 hashed)
   */
  login(username: string, password: string): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { headers, responseType: 'text', observe: 'response' };
    const body = { username, password };

    this.http.post<string>(API_BASE_URL + '/authenticate', body, options).subscribe((response: HttpResponse<string>) => {
      if (response.ok) {
        this.sessionToken = response.body;
        this.router.navigateByUrl('/dashboard');
      } else {
        console.log('Error when logging in', response.statusText);
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
    this.cookieService.set('theme', darkTheme ? 'dark' : 'light');
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
}
