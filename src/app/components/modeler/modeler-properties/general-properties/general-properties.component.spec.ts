import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPropertiesComponent } from './general-properties.component';

describe('GeneralPropertiesComponent', () => {
  let component: GeneralPropertiesComponent;
  let fixture: ComponentFixture<GeneralPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
