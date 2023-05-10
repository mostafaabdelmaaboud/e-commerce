import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { NgxsModule } from '@ngxs/store';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()]
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
