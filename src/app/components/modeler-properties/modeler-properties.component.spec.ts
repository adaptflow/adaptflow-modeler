import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelerPropertiesComponent } from './modeler-properties.component';

describe('ModelerPropertiesComponent', () => {
  let component: ModelerPropertiesComponent;
  let fixture: ComponentFixture<ModelerPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelerPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelerPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
