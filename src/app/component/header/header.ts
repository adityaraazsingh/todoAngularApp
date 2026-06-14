import { Component, inject } from '@angular/core';
import { appService } from '../../app.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  appService = inject(appService);

  logout() {
    this.appService.logout();
  }
}
