import { TestBed } from '@angular/core/testing';

import { EmbeddingsService } from './embeddings.service';

describe('EmbeddingsService', () => {
  let service: EmbeddingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbeddingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
