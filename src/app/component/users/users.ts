import { Component, EventEmitter, inject, OnInit, Output , output} from '@angular/core';
import { User } from "./user/user";
import {mockUsers} from "./user/user.mock";
import { appService } from '../../app.service';
import { userCred } from '../../bo/userCreds';

@Component({
  selector: 'app-users',
  imports: [User],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class Users implements OnInit {
  users!: userCred[];
  userId = output<number>();
  appService = inject(appService);
  usersAll! : userCred[];

  ngOnInit(): void {
    this.appService.getUserYouManages().subscribe(
      (data)=>{
        this.users = data
        console.log(this.usersAll)
      }
    );
  }
  
  onUserIdClick(id: number|undefined) {
    if(id){
      this.userId.emit(id);
      console.log("Its runing")
    }
    else
      return;
  }
}
