import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  /*
   * Create a new Form. Take note of the control names ("username" and "password")
   * as these will be used to bind this object to the template
   * 
   * To use these classes, you must import the "ReactiveFormsModule" module in AppModule
   */
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    //The the form is submited, use our auth service to perform the login
    if (this.loginForm.valid) {
      this.auth.login(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
    }
  }
}
