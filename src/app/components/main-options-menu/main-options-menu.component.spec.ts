/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainOptionsMenuComponent} from './main-options-menu.component';

describe('MainOptionsMenuComponent', () => {
  let component: MainOptionsMenuComponent;
  let fixture: ComponentFixture<MainOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainOptionsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
