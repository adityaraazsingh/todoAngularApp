import { Component, inject , input, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Task } from "./task/task";
import { AddTask } from './add-task/add-task';
import { appService } from '../../app.service';
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

  mockTasks = computed(()=>{
    return this.appService.mockTasks(this.userId());
  })

  ngOnInit(): void {
    this.appService.loadTasksPerRender();
  }

  toggleDialog(){
    this.closeDialog = false;
  }

  onCloseDialog(){
    this.closeDialog = true;
  }
}
