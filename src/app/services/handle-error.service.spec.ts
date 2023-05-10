import { TestBed } from '@angular/core/testing';

import { HandleErrorService } from './handle-error.service';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('HandleErrorService', () => {
  let service: HandleErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([]),
        ToastrModule.forRoot()
      ],
      providers: [ToastrService]
    });
    service = TestBed.inject(HandleErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
