/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {TestBed} from '@angular/core/testing';

import {PollItemService} from './poll-item.service';

describe('PollItemService', () => {
  let service: PollItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
