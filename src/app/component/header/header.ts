import { Component, inject , OnInit, signal} from '@angular/core';
import { appService } from '../../app.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  appService = inject(appService);
  userName = signal<string>("shiva");

  ngOnInit() {
    this.userName.set(this.appService.userName);
  }

  logout() {
    this.appService.logout();
  }
}
