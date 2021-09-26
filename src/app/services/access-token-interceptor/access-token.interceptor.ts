import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.auth.getAccessToken();
    if (authToken) {
      const requestWithAccessToken = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next.handle(requestWithAccessToken);
    } else {
      return next.handle(request);
    }
  }
}
