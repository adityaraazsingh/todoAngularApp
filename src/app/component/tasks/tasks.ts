import { Component, inject , input, computed, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { Task } from "./task/task";
import { AddTask } from './add-task/add-task';
import { appService } from '../../app.service';
import { RolesEnum } from '../../bo/userCreds';
import { TaskDetails } from '../../bo/tasksBo';
import { MatIcon } from "@angular/material/icon";
@Component({
  selector: 'app-tasks',
  imports: [Task, AddTask, MatIcon],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tasks implements OnInit{
  userId = input.required<number>();
  closeDialog = true;
  appService = inject(appService);
  role ! : RolesEnum;
  tobeEditedTask = signal<TaskDetails>({
    userId : 0 ,
    id: -1,
    description:'',
    title:'',
    date:''
  });
  showCompletedTask = signal(true);
  
  mockTasks = computed(() => {
    const showCompleted = this.showCompletedTask();
    const userId = this.userId();

    return this.appService.mockTasks(userId).filter(
      task => task.userId === userId && task.completed === showCompleted
    );
  });

  changeSort(){
    this.showCompletedTask.set(!this.showCompletedTask());
  }

  ngOnInit(): void {
    this.appService.loadTasksPerRender();
    this.role = this.appService.getRoleOfUser();
  }

  toggleDialog(){
    this.closeDialog = false;
  }

  onCloseDialog(){
    this.tobeEditedTask.set({   
      userId : 0 ,
      id: undefined,
      description:'',
      title:'',
      date:''
    });
    this.closeDialog = true;
  }

  onEditTask($event : TaskDetails){
    this.tobeEditedTask.set($event);
    this.closeDialog = false;

    console.log(this.tobeEditedTask());
  }
}
