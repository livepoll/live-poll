/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnalyticsComponent} from './analytics.component';

const routes: Routes = [
  { path: '', component: AnalyticsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
