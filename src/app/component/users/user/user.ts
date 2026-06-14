import { Component, EventEmitter, Input, Output , input } from '@angular/core';
import { Cards } from "../../../reuseable/cards/cards";
import { UserDetails } from '../../../bo/userBo';
import { userCred } from '../../../bo/userCreds';

@Component({
  selector: 'app-user',
  imports: [Cards],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  user = input.required<userCred>();
}
