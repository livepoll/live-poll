import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MyPollsRoutingModule } from './my-polls-routing.module';
import { MyPollsComponent } from './my-polls.component';
import { NewPollDialogComponent } from '../../dialogs/new-poll-dialog/new-poll-dialog.component';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [MyPollsComponent, NewPollDialogComponent],
  imports: [
    MyPollsRoutingModule,
    NzModalModule,
    NzInputModule,
    FormsModule,
  ],
  providers: [],
  exports: [MyPollsComponent]
})
export class MyPollsModule { }
