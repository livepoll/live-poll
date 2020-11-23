import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../model/user';

@Component({
  selector: 'app-main-options-menu',
  templateUrl: './main-options-menu.component.html',
  styleUrls: ['./main-options-menu.component.sass']
})
export class MainOptionsMenuComponent {
  @Input() userData: User;
  @Input() notifications: object[];
  @Output() logout = new EventEmitter();
}
