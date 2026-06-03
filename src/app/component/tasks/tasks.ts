import { Component, Input } from '@angular/core';
import { Task } from "./task/task";
import { mockTasks } from "./task/task.mock";
import { TaskDetails } from '../../bo/tasksBo';
import { AddTask } from './add-task/add-task';
@Component({
  selector: 'app-tasks',
  imports: [Task, AddTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  @Input({required: true}) userId! : number;
  closeDialog = true;

  get mockTasks() {
    return mockTasks.filter(task => task.userId === this.userId);
  }

  toggleDialog(){
    this.closeDialog = false;
  }

  addNewTask($event : {title: string, description: string, date : string}) {
    const mocktask : TaskDetails = {
      userId : this.userId,
      id : Math.floor(Math.random() * 1000),
      title : $event.title,
      date : $event.date,
      description : $event.description,
      completed : false
    }
    mockTasks.push(mocktask);
  }

  onCloseDialog(){
    this.closeDialog = true;
  }
}
