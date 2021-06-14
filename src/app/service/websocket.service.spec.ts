/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {TestBed} from '@angular/core/testing';

import {WebsocketService} from './websocket.service';

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
