import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserCollection } from '../../models/user-collection';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<UserCollection> {
    return this.http.get<UserCollection>(environment.baseUrl + 'users');
  }

  registerUsers(new_username: string, new_password: string): void{
    this.http
      .post<UserCollection>(environment.baseUrl + 'users/register', {
        new_username,
        new_password,
      })
      this.router.navigate(['/login']);
  }
}
