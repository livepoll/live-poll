/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {TestBed} from '@angular/core/testing';

import {PollService} from './poll.service';

describe('PollService', () => {
  let service: PollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
