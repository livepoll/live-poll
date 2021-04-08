/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultEmptyComponent} from './result-empty.component';

describe('ResultEmptyComponent', () => {
  let component: ResultEmptyComponent;
  let fixture: ComponentFixture<ResultEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
