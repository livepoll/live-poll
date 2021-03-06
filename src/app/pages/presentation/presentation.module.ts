/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PresentationComponent} from './presentation.component';
import {PresentationRoutingModule} from './presentation-routing.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {PieChartModule} from '@swimlane/ngx-charts';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTimelineModule} from 'ng-zorro-antd/timeline';

@NgModule({
  declarations: [PresentationComponent],
  imports: [
    PresentationRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzSpinModule,
    NzResultModule,
    NzButtonModule,
    PieChartModule,
    NzIconModule,
    NzTimelineModule
  ]
})
export class PresentationModule {
}
