import { TestBed } from '@angular/core/testing';

import { VectorStoreService } from './vector-store.service';

describe('VectorStoreService', () => {
  let service: VectorStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VectorStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
