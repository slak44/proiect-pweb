import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionDataSheetComponent } from './interaction-data-sheet.component';

describe('InteractionDataSheetComponent', () => {
  let component: InteractionDataSheetComponent;
  let fixture: ComponentFixture<InteractionDataSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionDataSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionDataSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
