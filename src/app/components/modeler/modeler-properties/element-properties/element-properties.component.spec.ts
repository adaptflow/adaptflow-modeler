import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPropertiesComponent } from './element-properties.component';

describe('ElementPropertiesComponent', () => {
  let component: ElementPropertiesComponent;
  let fixture: ComponentFixture<ElementPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
