import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MyPollsRoutingModule } from './my-polls-routing.module';
import { MyPollsComponent } from './my-polls.component';
import { NewPollDialogComponent } from '../../dialogs/new-poll-dialog/new-poll-dialog.component';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NewPollItemDialogComponent } from '../../dialogs/new-poll-item-dialog/new-poll-item-dialog.component';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  declarations: [MyPollsComponent, NewPollDialogComponent, NewPollItemDialogComponent],
  imports: [
    MyPollsRoutingModule,
    NzModalModule,
    NzInputModule,
    NzAlertModule,
    NzTimelineModule,
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzRadioModule,
  ],
  providers: [],
  exports: [MyPollsComponent]
})
export class MyPollsModule { }
