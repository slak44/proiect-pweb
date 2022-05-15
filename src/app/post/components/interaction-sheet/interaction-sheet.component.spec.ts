import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionSheetComponent } from './interaction-sheet.component';

describe('InteractionSheetComponent', () => {
  let component: InteractionSheetComponent;
  let fixture: ComponentFixture<InteractionSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
