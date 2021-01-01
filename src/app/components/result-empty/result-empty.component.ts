/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-result-empty',
  templateUrl: './result-empty.component.html',
  styleUrls: ['./result-empty.component.sass']
})
export class ResultEmptyComponent {
  @Input() message: string;
  @Input('button-text') buttonText: string;
  @Input() link: string;
}
