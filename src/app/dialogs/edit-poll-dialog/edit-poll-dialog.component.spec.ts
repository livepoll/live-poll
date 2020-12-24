import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPollDialogComponent } from './edit-poll-dialog.component';

describe('EditPollDialogComponent', () => {
  let component: EditPollDialogComponent;
  let fixture: ComponentFixture<EditPollDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPollDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
