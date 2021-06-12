/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewPollItemDialogComponent} from './new-poll-item-dialog.component';

describe('NewPollItemDialogComponent', () => {
  let component: NewPollItemDialogComponent;
  let fixture: ComponentFixture<NewPollItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPollItemDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPollItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
