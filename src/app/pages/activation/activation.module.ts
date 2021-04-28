/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {ActivationRoutingModule} from './activation-routing.module';
import {ActivationComponent} from './activation.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CommonModule} from '@angular/common';
import {ResultEmptyModule} from '../../components/result-empty/result-empty.module';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzSpinModule} from 'ng-zorro-antd/spin';

@NgModule({
  imports: [
    ActivationRoutingModule,
    NzButtonModule,
    NzEmptyModule,
    CommonModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzIconModule,
    ResultEmptyModule,
    NzResultModule,
    NzSpinModule
  ],
  declarations: [ActivationComponent],
  exports: [ActivationComponent]
})
export class ActivationModule { }
