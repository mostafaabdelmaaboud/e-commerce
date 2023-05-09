import { TestBed } from '@angular/core/testing';

import { CategorieUserService } from './categores.service';

describe('TaskUserService', () => {
  let service: CategorieUserService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieUserService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
