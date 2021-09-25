import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  username$: Observable<string | null> = this.auth.loginDetails$.pipe(
    map((details) => (details ? details.username : null))
  );

  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
