/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PresentationComponent} from './presentation.component';
import {PresentationRoutingModule} from './presentation-routing.module';

@NgModule({
  declarations: [PresentationComponent],
  imports: [
    PresentationRoutingModule,
    CommonModule
  ]
})
export class PresentationModule {}
