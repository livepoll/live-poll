import {Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  darkTheme = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    const themeValue = this.cookieService.get('theme');
    if (themeValue != null && themeValue === 'dark') {
      this.changeTheme(true);
    }
  }

  /**
   * Changes the theme of the app. There are two available themes:
   * light and dark.
   *
   * @param darkTheme True for dark theme, false for light theme
   */
  changeTheme(darkTheme: boolean): void {
    // Set cookie
    this.cookieService.set('theme', 'dark');
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
