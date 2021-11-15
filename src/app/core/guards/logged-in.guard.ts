import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginDetails } from '../models/login-details';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.loginDetails$.pipe(
      map((loginDetails: LoginDetails | null) => {
        if (loginDetails) {
          return true;
        } else {
          return this.router.parseUrl('');
        }
      })
    );
  }
}
