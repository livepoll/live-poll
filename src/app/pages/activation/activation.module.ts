/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {ActivationRoutingModule} from './activation-routing.module';
import {ActivationComponent} from './activation.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzSpinModule} from 'ng-zorro-antd/spin';

@NgModule({
  imports: [
    ActivationRoutingModule,
    NzResultModule,
    NzSpinModule,
    CommonModule,
    NzButtonModule
  ],
  declarations: [ActivationComponent],
  exports: [ActivationComponent]
})
export class ActivationModule {
}
