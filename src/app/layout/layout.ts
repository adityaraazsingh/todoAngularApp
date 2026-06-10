import { Component , signal} from '@angular/core';
import { Tasks } from '../component/tasks/tasks';
import { Users } from '../component/users/users';
import { Header } from '../component/header/header';

@Component({
  selector: 'app-layout',
  imports: [
    Header, 
    Users, 
    Tasks,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isLoggedIn = signal(false);
  protected readonly title = signal('todoAngularApp');
  userId! : number;
  
  onUserClick($event: number) {
    this.userId = $event;
  }
}
