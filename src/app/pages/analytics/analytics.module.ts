/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {NgModule} from '@angular/core';
import {AnalyticsRoutingModule} from './analytics-routing.module';
import {AnalyticsComponent} from './analytics.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    AnalyticsRoutingModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzIconModule
  ],
  declarations: [AnalyticsComponent],
  exports: [AnalyticsComponent]
})
export class AnalyticsModule { }
