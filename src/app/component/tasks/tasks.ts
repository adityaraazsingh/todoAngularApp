import { Component, inject , input, computed, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { Task } from "./task/task";
import { AddTask } from './add-task/add-task';
import { appService } from '../../app.service';
import { RolesEnum } from '../../bo/userCreds';
import { TaskDetails } from '../../bo/tasksBo';
@Component({
  selector: 'app-tasks',
  imports: [Task, AddTask],
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

  mockTasks = computed(()=>{
    return this.appService.mockTasks(this.userId());
  })

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
