import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from './store/state/login.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private store: Store, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = localStorage.getItem("token");
    if (authToken && (state.url === "/login" || state.url === "/register")) {
      this.router.navigate(["/"]);
      return false;
    } else if (!authToken && (state.url === "/" || state.url === "/carts")) {
      this.router.navigate(["/login"]);
      return false;
    } else {
      return true;
    }
  }
}
