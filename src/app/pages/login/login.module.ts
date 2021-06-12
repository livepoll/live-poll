/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LogInRoutingModule} from './login-routing.module';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {ReactiveFormsModule} from '@angular/forms';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzCardModule} from 'ng-zorro-antd/card';
import {WavesModule} from '../../components/waves/waves.module';
import {CommonModule} from '@angular/common';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    LogInRoutingModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzCardModule,
    WavesModule,
    CommonModule,
    NzIconModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {
}
