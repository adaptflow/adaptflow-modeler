import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsPaletteComponent } from './elements-palette.component';

describe('ElementsPaletteComponent', () => {
  let component: ElementsPaletteComponent;
  let fixture: ComponentFixture<ElementsPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsPaletteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
