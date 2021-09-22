import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginDetails } from 'src/app/models/login-details';
import { LoginResponse } from 'src/app/models/login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {  
  AUTH_DETAILS_KEY: string = 'ic-resuse_auth_details';
  loggedIn$ = new BehaviorSubject<boolean>(false);
  loginDetails$ = new Subject<LoginDetails | null>();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): void {
    this.http
      .post<LoginResponse>(environment.baseUrl + 'users/login', { username, password })
      .subscribe((resp: LoginResponse) => {
        const decoded: any = this.decodeToken(resp.accessToken);

        const loginDetails: LoginDetails = {
          username: resp.username,
          expires: decoded.exp,
          accessToken: resp.accessToken,
          refreshToken: resp.refreshToken,
        };

        localStorage.setItem(
          this.AUTH_DETAILS_KEY,
          JSON.stringify(loginDetails)
        );

        this.loggedIn$.next(true);
        this.loginDetails$.next(loginDetails);

        this.router.navigate(['']);
      });
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_DETAILS_KEY);
    this.loggedIn$.next(false);
    this.loginDetails$.next(null);
    this.http.post('users/logout', {}).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  decodeToken(token: string): any {
    //https://stackoverflow.com/a/38552302/821918
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
