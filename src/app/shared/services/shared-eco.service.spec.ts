import { TestBed } from '@angular/core/testing';

import { SharedEcoService } from './shared-eco.service';

describe('SharedEcoService', () => {
  let service: SharedEcoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedEcoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
