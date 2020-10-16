import { NgModule } from '@angular/core';
import { MyPollsRoutingModule } from './my-polls-routing.module';
import { MyPollsComponent } from './my-polls.component';

@NgModule({
  imports: [MyPollsRoutingModule],
  declarations: [MyPollsComponent],
  exports: [MyPollsComponent]
})
export class MyPollsModule { }
