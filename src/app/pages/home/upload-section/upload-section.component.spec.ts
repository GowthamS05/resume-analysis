import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSectionComponent } from './upload-section.component';

describe('UploadSectionComponent', () => {
  let component: UploadSectionComponent;
  let fixture: ComponentFixture<UploadSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
