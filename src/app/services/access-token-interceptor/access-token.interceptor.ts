import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addAuthenticationToken(request);

    return next.handle(request).pipe(
      catchError((error) => {
        //The refresh token was rejected, auth has expired and the user must log in again
        if (error.status === 401 && request.url.includes('refresh-token')) {
          this.auth.logout();
          return throwError(error);
        }

        //The login was rejected, user neeed to supply valid creds
        if (error.status == 401 && request.url.includes('login')) {
          return throwError(error);
        }

        //The logout was rejected, probably because the token expired
        if (error.status == 401 && request.url.includes('logout')) {
          return throwError(error);
        }

        //If there error was not related to auth, pass the error along so the caller can deal with it
        if (error.status !== 401) {
          return throwError(error);
        }

        return this.auth.refreshAccessToken().pipe(
          switchMap(() => {
            return next.handle(this.addAuthenticationToken(request));
          })
        );
      })
    );
  }

  addAuthenticationToken(request: HttpRequest<unknown>) {
    const accessToken = this.auth.getAccessToken();
    if (!accessToken) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
      },
    });
  }
}
