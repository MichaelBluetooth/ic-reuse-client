import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDetails } from './models/login-details';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  //Listen for any changes to the login details.
  //When we get some details, extract the "username"
  //
  //Note that this is actually just another observable
  //  that's used in the template
  loginDetails$: Observable<LoginDetails | null> = this.auth.loginDetails$

  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
