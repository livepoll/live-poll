/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultEmptyComponent} from './result-empty.component';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [ResultEmptyComponent],
    exports: [
        ResultEmptyComponent
    ],
  imports: [
    CommonModule,
    NzEmptyModule,
    NzButtonModule,
    RouterModule
  ]
})
export class ResultEmptyModule { }
