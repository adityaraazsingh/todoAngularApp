import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, OnInit, Output , output , signal} from '@angular/core';
import { User } from "./user/user";
import {mockUsers} from "./user/user.mock";
import { appService } from '../../app.service';
import { userCred } from '../../bo/userCreds';

@Component({
  selector: 'app-users',
  imports: [User],
  templateUrl: './users.html',
  styleUrl: './users.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class Users {
  users= signal<userCred[]>([]);
  userId = output<number>();
  appService = inject(appService);
  usersAll! : userCred[];

  constructor(){
    effect(()=>{
      this.appService.userUpdated();
      this.loadUsers();
    })
  }

  loadUsers(){
    this.appService.getUserYouManages().subscribe(
      (data)=>{
        this.users.set(data)
        console.log(this.users())
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
