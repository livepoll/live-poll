/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PollParticipantsComponent} from './poll-participants.component';
import {PollParticipantsRoutingModule} from './poll-participants-routing.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {FormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzResultModule} from 'ng-zorro-antd/result';

@NgModule({
  declarations: [PollParticipantsComponent],
  imports: [
    PollParticipantsRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzRadioModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpinModule,
    NzResultModule
  ]
})
export class PollParticipantsModule {
}
