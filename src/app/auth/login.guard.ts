import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  plateformId: object
  constructor(private store: Store, private router: Router, @Inject(PLATFORM_ID) plateformId: object) {
    this.plateformId = plateformId;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authToken = "";
    if (isPlatformBrowser(this.plateformId)) {
      let authToken = localStorage.getItem("token");

    }
    if (authToken) {
      this.router.navigate(["/"]);
      return false;
    } else {
      return true;
    }

  }

}
