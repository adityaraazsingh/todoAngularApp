import { Component, inject, input, OnInit  } from '@angular/core';
import { Cards } from "../../../reuseable/cards/cards";
import { TaskDetails } from '../../../bo/tasksBo';
import { DatePipe } from '@angular/common';
import { appService } from '../../../app.service';

@Component({
  selector: 'app-task',
  imports: [Cards, DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  task = input.required<TaskDetails>();
  appService = inject(appService);

  onCompleteClick(task : TaskDetails){
    this.appService.onCompleteClick(task).subscribe();
  }
}
