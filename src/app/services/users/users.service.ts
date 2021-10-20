import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCollection } from 'src/app/models/user-collection';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserCollection> {
    return this.http.get<UserCollection>(environment.baseUrl + 'users');
  }
}
