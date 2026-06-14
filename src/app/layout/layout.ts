import { Component , OnInit, signal, inject} from '@angular/core';
import { Tasks } from '../component/tasks/tasks';
import { Users } from '../component/users/users';
import { Header } from '../component/header/header';
import { appService } from '../app.service';
import { RolesEnum } from '../bo/userCreds';

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
export class Layout implements OnInit {
  isLoggedIn = signal(false);
  protected readonly title = signal('todoAngularApp');
  userId! : number;
  appService = inject(appService);
  role!: RolesEnum ;;

  ngOnInit(): void {
    this.role = this.appService.getRoleOfUser();
  }

  onUserClick($event: number) {
    this.userId = $event;
  }
}
