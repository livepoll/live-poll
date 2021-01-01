/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule} from '@angular/forms';

import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {MainOptionsMenuModule} from '../../components/main-options-menu/main-options-menu.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzBadgeModule,
    NzAvatarModule,
    NzSwitchModule,
    NzPopoverModule,
    NzIconModule,
    NzTabsModule,
    NzCollapseModule,
    CommonModule,
    NzButtonModule,
    NzEmptyModule,
    NzTypographyModule,
    NzGridModule,
    NzUploadModule,
    MainOptionsMenuModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
