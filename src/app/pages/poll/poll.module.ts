/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PollRoutingModule} from './poll-routing.module';
import {PollComponent} from './poll.component';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzNoAnimationModule} from 'ng-zorro-antd/core/no-animation';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {RouterModule} from '@angular/router';
import {MyPollsModule} from '../my-polls/my-polls.module';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {ResultEmptyModule} from '../../components/result-empty/result-empty.module';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzListModule} from 'ng-zorro-antd/list';
import {ResultErrorModule} from '../../components/result-error/result-error.module';
import {NzSpinModule} from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [PollComponent],
  imports: [
    PollRoutingModule,
    CommonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzNoAnimationModule,
    NzGridModule,
    NzTagModule,
    NzLayoutModule,
    RouterModule,
    MyPollsModule,
    NzTabsModule,
    ResultEmptyModule,
    NzTypographyModule,
    NzInputModule,
    FormsModule,
    NzToolTipModule,
    NzCardModule,
    NzListModule,
    ResultErrorModule,
    NzSpinModule
  ]
})
export class PollModule { }
