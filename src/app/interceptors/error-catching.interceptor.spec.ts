import { TestBed } from '@angular/core/testing';

import { ErrorCatchingInterceptor } from './error-catching.interceptor';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';

describe('ErrorCatchingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NgxsModule.forRoot([]),
      ToastrModule.forRoot()
    ],
    providers: [
      ErrorCatchingInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: ErrorCatchingInterceptor = TestBed.inject(ErrorCatchingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
