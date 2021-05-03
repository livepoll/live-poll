/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivationComponent} from './activation.component';

const routes: Routes = [
  { path: '', component: ActivationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
