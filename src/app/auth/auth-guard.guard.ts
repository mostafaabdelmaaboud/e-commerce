import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from './store/state/login.state';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  plateformId: object;
  constructor(private store: Store, private router: Router, @Inject(PLATFORM_ID) plateformId: object) {
    this.plateformId = plateformId;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger;
    let authToken;
    if (isPlatformBrowser(this.plateformId)) {
      authToken = localStorage.getItem("token");

    }
    if (authToken) {
      return true;

    } else {
      if (isPlatformBrowser(this.plateformId) && !authToken) {
        this.router.navigate(["/login"]);

      }
      return false;
    }
  }
}
