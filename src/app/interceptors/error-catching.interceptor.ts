import { Inject, Injectable, Injector, Optional, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HandleErrorService } from '../services/handle-error.service';
import { ToastrService } from 'ngx-toastr';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
// case insensitive check against config and value
const startsWithAny = (arr: string[] = []) => (value = '') => {
  return arr.some(test => value.toLowerCase().startsWith(test.toLowerCase()));
};

// http, https, protocol relative
const isAbsoluteURL = startsWithAny(['http', '//']);

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  private error = inject(HandleErrorService);
  constructor(@Optional() @Inject(REQUEST) protected request: Request) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.request && !isAbsoluteURL(request.url)) {
      const protocolHost = `${this.request.protocol}://${this.request.get(
        'host'
      )}`;
      const pathSeparator = !request.url.startsWith('/') ? '/' : '';
      const url = protocolHost + pathSeparator + request.url;
      const serverRequest = request.clone({ url });
      return next.handle(serverRequest).pipe(catchError(err => {
        this.error.handleError(err)
        throw err;
      }))
    } else {
      return next.handle(request).pipe(catchError(err => {
        this.error.handleError(err)
        throw err;
      }))
    }

  }
}
