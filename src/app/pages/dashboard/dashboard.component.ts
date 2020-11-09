import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  @Input() jwtToken = '';
  @Input() darkTheme: boolean;
  @Output() changeTheme = new EventEmitter<boolean>();

  isCollapsed = false;
  notifications = [
    { id: 101, title: 'Poll "Test poll" opened', message: 'Your poll "Test poll" opened to participants. Share this link to your participants: <a href="https://www.live-poll.de/p/test-poll">https://www.live-poll.de/p/test-poll</a>', silent: true },
    { id: 102, title: 'Poll "Test poll" closed', message: 'Your poll "Test poll" is closed now for all participants.', silent: false }
  ];

  constructor(private router: Router) {}

  /**
   * Initialize the dashboard component
   */
  ngOnInit(): void {
    // Redirect to login page, if the jwt token is empty
    if (this.jwtToken.length === 0) this.router.navigateByUrl('/login');
  }

  /**
   * Returns all non-silent notifications from the notifications list
   */
  getNonSilentNotifications(): any[] {
    return this.notifications.filter(n => n.silent === false);
  }
}
