import { TestBed } from '@angular/core/testing';

import { CategorieUserService } from './categores.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TaskUserService', () => {
  let service: CategorieUserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(CategorieUserService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
