/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {TestBed} from '@angular/core/testing';

import {AccountService} from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
