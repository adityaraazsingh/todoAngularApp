import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./component/header/header";
import { Users } from "./component/users/users";
import { Tasks } from "./component/tasks/tasks";

@Component({
  selector: 'app-root',
  imports: [Header, Users, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todoAngularApp');
  userId! : number;
  
  onUserClick($event: number) {
    this.userId = $event;
  }
}
