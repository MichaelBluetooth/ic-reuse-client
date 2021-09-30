import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDetails } from 'src/app/models/login-details';
import { LoginResponse } from 'src/app/models/login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_DETAILS_KEY: string = 'ic-resuse_auth_details';

  //Create an observable to track the login details and share them with any components that may need it
  //Unlike a "BehaviorSubject", a "Subject" does not require an initial value.
  loginDetails$ = new BehaviorSubject<LoginDetails | null>(null);

  //A timer to track logouts whether the user should be logged out
  private _logoutTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): void {
    this.http
      .post<LoginResponse>(environment.baseUrl + 'users/login', {
        username,
        password,
      })
      .subscribe((resp: LoginResponse) => {
        this.handleAuthResponse(resp);
        this.router.navigate(['']);
      });
  }

  logout(): void {
    //Tell the server we're logging out and navigate to the homepage
    this.http.post(environment.baseUrl + 'users/logout', {}).subscribe(
      () => {
        //on success, navigate to home page
        this.router.navigate(['']);
      },
      () => {
        //on error, also navigate to home page
        //we've already deleted the token, so there's nothing else for us to do
        this.router.navigate(['']);
      },
      () => {
        //Regardless of whether the API failed or succeeed, clear local storage and alert anyone listening that we're logged out
        localStorage.removeItem(this.AUTH_DETAILS_KEY);
        this.loginDetails$.next(null);
      }
    );
  }

  refreshAccessToken(): Observable<string> {
    return this.http
      .post<LoginResponse>(environment.baseUrl + 'users/refresh-token', {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        map((resp: LoginResponse) => {
          this.handleAuthResponse(resp);
          return resp.refreshToken;
        })
      );
  }

  handleAuthResponse(resp: LoginResponse): void {
    //The access token in the response will be a Base64 encoded object.
    //Decode it to get any claims or other details
    const decoded: any = this.decodeToken(resp.accessToken);

    //Create an object to store relavent details
    const loginDetails: LoginDetails = {
      username: resp.username, //The current users name
      expires: decoded.exp, //The expiration date of the token will be
      accessToken: resp.accessToken, //The access token needed to make requests against protected resources
      refreshToken: resp.refreshToken, //The token used to obtain a new access token when it expires
    };

    //Persist the detail in local storage, which allows other tabs to access it
    //We'll want to load this on app startup to check whether the user is logged
    //  in, for example if they open a new tab.
    localStorage.setItem(this.AUTH_DETAILS_KEY, JSON.stringify(loginDetails));

    //Emit the details to anyone listening
    this.loginDetails$.next(loginDetails);

    //If there's an existing timer, clear it so we can update it with the latest expiration
    if (this._logoutTimer) {
      clearTimeout(this._logoutTimer);
    }

    let expiresDate = new Date(0); //epoch in local time, e.g. EST (aka Thu, 01 Jan 1970 00:00:00 GMT)
    expiresDate.setUTCSeconds(decoded.exp); //server gives us the number of seconds from epoch until expiration (e.g. 5 minutes)
    let now = new Date(); //the current time
    this._logoutTimer = setTimeout(() => {
      //after the access token expires, wait an extra 10 minutes of inactivity (600000ms), then automatically log the user out
      this.logout();
    }, expiresDate.getTime() - now.getTime() + 600000);
  }

  getAccessToken(): string | null {
    const details = localStorage[this.AUTH_DETAILS_KEY];
    return details ? JSON.parse(details).accessToken : null;
  }

  getRefreshToken(): string | null {
    const details = localStorage[this.AUTH_DETAILS_KEY];
    return details ? JSON.parse(details).refreshToken : null;
  }

  /*
   * Helper function used to decode our JWT
   */
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
