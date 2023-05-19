import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Logout } from '../auth/store/actions/login.actions';
import { isPlatformBrowser } from '@angular/common';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {
  plateformId: object;

  constructor(private store: Store, private router: Router, private toastr: ToastrService, @Inject(PLATFORM_ID) plateformId: object) {
    this.plateformId = plateformId;
  }

  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    debugger;
    if (err.status === 0) {
      errorMessage = `An error occurred: ${err.error.message}`;
      console.error('An error occurred:', err.error);

    } else {
      switch (err.status) {
        case 400:
          errorMessage = `${err.status} Bad Request.`;
          break;
        case 401:
          errorMessage = `${err.status} You are unauthorized to do this action`;
          break;
        case 403:
          errorMessage = `${err.status} You don't have permission to access the request resource.`;
          break;
        case 404:
          errorMessage = `${err.status} the request resource does not exist.`;
          break;
        case 412:
          errorMessage = `${err.status} Precondition Faild.`;
          break;
        case 500:
          errorMessage = `${err.status} Internal Server Error.`;
          break;
        case 503:
          errorMessage = `${err.status} The Request service is not available.`;
          break;
        default:
          errorMessage = `somthing went wrong!`
      }
      if (err.error?.errors) {
        errorMessage = errorMessage + " " + err.error.massage

      }
      if (err.error?.message) {
        errorMessage = err.error.message;
      }

      if ((err?.status == 500 && err.error?.message == "jwt expired") || err?.status == 401) {
        this.store.dispatch(new Logout()).subscribe(logout => {
          this.router.navigate(["/login"]);
        });
        this.toastr.error(errorMessage, '', {
          timeOut: 2000,
          onActivateTick: true
        });


      } else {
        this.toastr.error(errorMessage, '', {
          timeOut: 5000,
          onActivateTick: true

        });
      }
    }
    return throwError(() => new Error(errorMessage));
  }


}
