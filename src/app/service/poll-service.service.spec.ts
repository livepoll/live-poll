/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import { TestBed } from '@angular/core/testing';

import { PollServiceService } from './poll-service.service';

describe('PollServiceService', () => {
  let service: PollServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
