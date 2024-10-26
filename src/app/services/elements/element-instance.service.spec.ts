import { TestBed } from '@angular/core/testing';

import { ElementInstanceService } from './element-instance.service';

describe('ElementInstanceService', () => {
  let service: ElementInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
