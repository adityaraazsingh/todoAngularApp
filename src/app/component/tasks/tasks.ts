import { Component, inject , input } from '@angular/core';
import { Task } from "./task/task";
import { AddTask } from './add-task/add-task';
import { appService } from '../../app.service';
@Component({
  selector: 'app-tasks',
  imports: [Task, AddTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  userId = input.required<number>();
  closeDialog = true;
  appService = inject(appService);

  get mockTasks(){
    return this.appService.mockTasks(this.userId());
  }

  toggleDialog(){
    this.closeDialog = false;
  }

  onCloseDialog(){
    this.closeDialog = true;
  }
}
