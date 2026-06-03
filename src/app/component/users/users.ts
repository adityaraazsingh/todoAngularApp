import { Component, EventEmitter, Output , output} from '@angular/core';
import { User } from "./user/user";
import {mockUsers} from "./user/user.mock";

@Component({
  selector: 'app-users',
  imports: [User],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class Users {
  users= mockUsers;
  // @Output() userId = new EventEmitter<number>();
  userId = output<number>();
  
  onUserIdClick(id: number) {
    this.userId.emit(id);
  }
}
