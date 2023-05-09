import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.guard';
import { NgxsModule } from '@ngxs/store';


describe('AuthGuardGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([]),

      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
