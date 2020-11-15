/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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

@NgModule({
  declarations: [PollComponent],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzNoAnimationModule,
    NzGridModule,
    NzTagModule
  ]
})
export class PollModule { }
