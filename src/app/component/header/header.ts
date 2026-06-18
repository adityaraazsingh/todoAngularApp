import { Component, inject , OnInit, signal} from '@angular/core';
import { appService } from '../../app.service';
import { Profile } from '../../profile/profile';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    Profile,
    MatIconModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  appService = inject(appService);
  userName = signal<string>("");
  showProfile : boolean =  false;

  ngOnInit() {
    this.userName.set(this.appService.userName);
  }

  logout() {
    this.appService.logout();
  }

  onCloseProfile(){
    this.showProfile = false;
  }

  onOpenProfile(){
    this.showProfile = true;
  }
}
