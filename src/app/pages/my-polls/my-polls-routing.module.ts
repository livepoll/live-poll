import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPollsComponent } from './my-polls.component';

const routes: Routes = [
  { path: '', component: MyPollsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPollsRoutingModule { }
