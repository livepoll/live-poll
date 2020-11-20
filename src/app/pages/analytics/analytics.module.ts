/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {NgModule} from '@angular/core';
import {AnalyticsRoutingModule} from './analytics-routing.module';
import {AnalyticsComponent} from './analytics.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CommonModule} from '@angular/common';
import {ResultEmptyModule} from '../../components/result-empty/result-empty.module';

@NgModule({
  imports: [
    AnalyticsRoutingModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzIconModule,
    CommonModule,
    ResultEmptyModule
  ],
  declarations: [AnalyticsComponent],
  exports: [AnalyticsComponent]
})
export class AnalyticsModule { }
