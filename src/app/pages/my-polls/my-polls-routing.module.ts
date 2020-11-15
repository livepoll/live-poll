/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyPollsComponent} from './my-polls.component';

const routes: Routes = [
  { path: '', component: MyPollsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPollsRoutingModule { }
