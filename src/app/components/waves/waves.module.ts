/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WavesComponent} from './waves.component';


@NgModule({
  declarations: [WavesComponent],
  exports: [
    WavesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WavesModule {
}
