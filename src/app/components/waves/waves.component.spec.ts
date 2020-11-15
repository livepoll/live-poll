/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WavesComponent} from './waves.component';

describe('WavesComponent', () => {
  let component: WavesComponent;
  let fixture: ComponentFixture<WavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
