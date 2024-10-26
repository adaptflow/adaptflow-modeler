import { TestBed } from '@angular/core/testing';

import { AdaptflowService } from './adaptflow.service';

describe('AdaptflowService', () => {
  let service: AdaptflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdaptflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
