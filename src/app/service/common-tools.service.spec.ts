/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {TestBed} from '@angular/core/testing';

import {CommonToolsService} from './common-tools.service';

describe('CommonToolsService', () => {
  let service: CommonToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
