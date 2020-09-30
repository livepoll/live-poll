import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignSurveyComponent } from './sign-survey.component';

describe('SignSurveyComponent', () => {
  let component: SignSurveyComponent;
  let fixture: ComponentFixture<SignSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
