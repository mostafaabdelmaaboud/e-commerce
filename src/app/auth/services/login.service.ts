import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Authlogin, IntLogin } from '../context/DTOs';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  constructor() {
  }
  login(model: IntLogin): Observable<Authlogin> {
    return this.http.post<Authlogin>(`${environment.baseApi}/auth/login`, model);

  }
}
