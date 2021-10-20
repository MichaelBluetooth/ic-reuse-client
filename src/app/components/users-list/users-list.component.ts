import { Component, OnInit } from '@angular/core';
import { UserCollection } from 'src/app/models/user-collection';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less'],
})
export class UsersListComponent implements OnInit {
  users: UserCollection;

  constructor(private usersSvc: UsersService) {}

  ngOnInit(): void {
    this.usersSvc.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
