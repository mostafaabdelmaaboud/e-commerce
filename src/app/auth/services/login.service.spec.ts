import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
