import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    new_username: new FormControl(null, Validators.required),
    new_password: new FormControl(null, Validators.required),
    confirm_password: new FormControl(null,Validators.required)
  });

  constructor(private usersSvc: UsersService) { }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.valid && this.registerForm.value.new_password == this.registerForm.value.confirm_password){
      this.usersSvc.registerUsers(
        this.registerForm.value.new_username,
        this.registerForm.value.new_password
      )
      alert("Successfully Registerd")
    }else{
      alert("Passwords dont match")
    }
  }
}

