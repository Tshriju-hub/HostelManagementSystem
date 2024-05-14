import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'pm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[];

  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe((users) => { this.users = users; });
  }

  ngOnInit(): void {
  }

}
