import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;
  darkTheme = false;
  notifications = [
    { id: 101, title: 'Poll "Test poll" opened', message: 'Your poll "Test poll" opened to participants. Share this link to your participants: <a href="https://www.live-poll.de/p/test-poll">https://www.live-poll.de/p/test-poll</a>', silent: true },
    { id: 102, title: 'Poll "Test poll" closed', message: 'Your poll "Test poll" is closed now for all participants.', silent: false }
  ];

  constructor(private cookieService: CookieService, private route: ActivatedRoute) {}

  /**
   * Initialize the application
   */
  ngOnInit(): void {
    // Set persisted theme
    this.darkTheme = this.cookieService.get('theme') === 'dark';
    if (this.darkTheme) {
      this.changeTheme(true);
    }
  }

  /**
   * Returns all non-silent notifications from the notifications list
   */
  getNonSilentNotifications(): any[] {
    return this.notifications.filter(n => n.silent === false);
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
      if (dom) {
        dom.remove();
      }
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
      if (dom) {
        dom.remove();
      }
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
