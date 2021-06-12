/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultErrorComponent} from './result-error.component';

import {NzResultModule} from 'ng-zorro-antd/result';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTypographyModule} from 'ng-zorro-antd/typography';

@NgModule({
  declarations: [ResultErrorComponent],
  exports: [
    ResultErrorComponent
  ],
  imports: [
    CommonModule,
    NzResultModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule
  ]
})
export class ResultErrorModule {
}
