import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cards } from "../../../reuseable/cards/cards";
import { UserDetails } from '../../../bo/userBo';

@Component({
  selector: 'app-user',
  imports: [Cards],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input({required: true}) user! : UserDetails;
}
