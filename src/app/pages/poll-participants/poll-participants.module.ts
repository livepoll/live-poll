/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PollParticipantsComponent} from './poll-participants.component';
import {PollParticipantsRoutingModule} from './poll-participants-routing.module';

@NgModule({
  declarations: [PollParticipantsComponent],
  imports: [
    PollParticipantsRoutingModule,
    CommonModule
  ]
})
export class PollParticipantsModule {}
