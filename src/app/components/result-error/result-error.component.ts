/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-result-error',
  templateUrl: './result-error.component.html',
  styleUrls: ['./result-error.component.sass']
})
export class ResultErrorComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() errorMessages: string[];
}
