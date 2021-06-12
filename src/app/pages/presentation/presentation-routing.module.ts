/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PresentationComponent} from './presentation.component';

const routes: Routes = [
  {path: '', component: PresentationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule {
}
