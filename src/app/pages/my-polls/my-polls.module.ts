import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MyPollsRoutingModule } from './my-polls-routing.module';
import { MyPollsComponent } from './my-polls.component';
import { NewPollDialogComponent } from '../../dialogs/new-poll-dialog/new-poll-dialog.component';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule} from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NewPollItemDialogComponent } from '../../dialogs/new-poll-item-dialog/new-poll-item-dialog.component';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [MyPollsComponent, NewPollDialogComponent, NewPollItemDialogComponent],
  imports: [
    MyPollsRoutingModule,
    NzModalModule,
    NzInputModule,
    NzAlertModule,
    NzStepsModule,
    NzDividerModule,
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzRadioModule,
    NzButtonModule,
    NzIconModule,
  ],
  providers: [],
  exports: [MyPollsComponent]
})
export class MyPollsModule { }
