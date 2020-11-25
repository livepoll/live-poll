/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {MyPollsRoutingModule} from './my-polls-routing.module';
import {MyPollsComponent} from './my-polls.component';
import {NewPollDialogComponent} from '../../dialogs/new-poll-dialog/new-poll-dialog.component';
import {ResultErrorModule} from '../../components/result-error/result-error.module';
import {ResultEmptyModule} from '../../components/result-empty/result-empty.module';

import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NewPollItemDialogComponent} from '../../dialogs/new-poll-item-dialog/new-poll-item-dialog.component';
import {CommonModule} from '@angular/common';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NzFormModule} from 'ng-zorro-antd/form';

@NgModule({
  declarations: [MyPollsComponent, NewPollDialogComponent, NewPollItemDialogComponent],
    imports: [
        MyPollsRoutingModule,
        NzModalModule,
        NzInputModule,
        NzAlertModule,
        NzStepsModule,
        NzDividerModule,
        NzSwitchModule,
        FormsModule,
        CommonModule,
        NzLayoutModule,
        NzRadioModule,
        NzButtonModule,
        NzIconModule,
        NzBreadCrumbModule,
        NzCollapseModule,
        ResultErrorModule,
        ResultEmptyModule,
        NzSpinModule,
        NzPageHeaderModule,
        NzTagModule,
        NzGridModule,
        NzCardModule,
        NzStatisticModule,
        NzFormModule
    ],
  providers: [],
    exports: [MyPollsComponent, NewPollItemDialogComponent]
})
export class MyPollsModule { }
