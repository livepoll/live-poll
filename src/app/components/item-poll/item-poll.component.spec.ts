/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemPollComponent} from './item-poll.component';

describe('ItemPollComponent', () => {
  let component: ItemPollComponent;
  let fixture: ComponentFixture<ItemPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
