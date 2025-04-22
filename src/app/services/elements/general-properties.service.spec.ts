import { TestBed } from '@angular/core/testing';

import { GeneralPropertiesService } from './general-properties.service';

describe('GeneralPropertiesService', () => {
  let service: GeneralPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
