import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsFormatHeaderComponent } from './format-score-header.component';

describe('AtsFormatHeaderComponent', () => {
  let component: AtsFormatHeaderComponent;
  let fixture: ComponentFixture<AtsFormatHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtsFormatHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsFormatHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
