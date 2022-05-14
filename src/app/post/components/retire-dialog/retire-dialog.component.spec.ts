import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetireDialogComponent } from './retire-dialog.component';

describe('RetireDialogComponent', () => {
  let component: RetireDialogComponent;
  let fixture: ComponentFixture<RetireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetireDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
