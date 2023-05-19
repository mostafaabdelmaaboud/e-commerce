import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
// case insensitive check against config and value
const startsWithAny = (arr: string[] = []) => (value = '') => {
  return arr.some(test => value.toLowerCase().startsWith(test.toLowerCase()));
};

// http, https, protocol relative
const isAbsoluteURL = startsWithAny(['http', '//']);
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  plateformId: object;

  constructor(@Optional() @Inject(REQUEST) protected request: Request, @Inject(PLATFORM_ID) plateformId: object) {
    this.plateformId = plateformId;

  }
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.request && !isAbsoluteURL(req.url)) {
      const protocolHost = `${this.request.protocol}://${this.request.get(
        'host'
      )}`;
      const pathSeparator = !req.url.startsWith('/') ? '/' : '';
      const url = protocolHost + pathSeparator + req.url;
      const reqLogin = !req.url.includes("auth/login");

      const token = isPlatformBrowser(this.plateformId) ?? localStorage.getItem("token");
      let serverRequest = req.clone({ url });
      if (token) {
        serverRequest = req.clone({
          url,
          headers: req.headers.set("Authorization", "Bearer " + token)
        })
      }
      return next.handle(serverRequest);
    } else {
      const reqLogin = !req.url.includes("auth/login");
      let token = "";
      if (isPlatformBrowser(this.plateformId)) {
        const token = localStorage.getItem("token");

      }
      let modifiedUrl = req;
      if (token) {
        modifiedUrl = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token)
        })
      }
      return next.handle(modifiedUrl);
    }

  }
}
