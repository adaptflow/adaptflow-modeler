import { TestBed } from '@angular/core/testing';

import { ProcessManagerService } from './process-manager.service';

describe('ProcessManagerService', () => {
  let service: ProcessManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
