/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {ErrorComponent} from './error.component';
import {ErrorRoutingModule} from './error-routing.module';

@NgModule({
  imports: [
    ErrorRoutingModule
  ],
  declarations: [ErrorComponent],
  exports: [ErrorComponent]
})
export class ErrorModule { }
