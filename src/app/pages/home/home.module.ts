/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CommonModule} from '@angular/common';
import {ResultEmptyModule} from '../../components/result-empty/result-empty.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    NzButtonModule,
    NzEmptyModule,
    CommonModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzIconModule,
    ResultEmptyModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {
}
