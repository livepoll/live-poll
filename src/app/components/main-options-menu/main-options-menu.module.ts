/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainOptionsMenuComponent} from './main-options-menu.component';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzBadgeModule} from 'ng-zorro-antd/badge';

@NgModule({
  declarations: [MainOptionsMenuComponent],
  exports: [
    MainOptionsMenuComponent
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzUploadModule,
    NzAvatarModule,
    NzCollapseModule,
    NzButtonModule,
    NzEmptyModule,
    NzIconModule,
    NzGridModule,
    NzBadgeModule
  ]
})
export class MainOptionsMenuModule { }
