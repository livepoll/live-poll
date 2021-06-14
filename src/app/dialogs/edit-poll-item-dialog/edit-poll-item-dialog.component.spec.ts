/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPollItemDialogComponent} from './edit-poll-item-dialog.component';

describe('NewPollItemDialogComponent', () => {
  let component: EditPollItemDialogComponent;
  let fixture: ComponentFixture<EditPollItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPollItemDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPollItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
