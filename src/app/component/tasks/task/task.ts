import { ChangeDetectionStrategy, Component, inject, input, OnInit, output  } from '@angular/core';
import { Cards } from "../../../reuseable/cards/cards";
import { TaskDetails } from '../../../bo/tasksBo';
import { DatePipe } from '@angular/common';
import { appService } from '../../../app.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-task',
  imports: [Cards, DatePipe ,MatIconModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Task {
  task = input.required<TaskDetails>();
  appService = inject(appService);
  onEditClickTask = output<TaskDetails>();
  
  onCompleteClick(task : TaskDetails){
    this.appService.onCompleteClick(task).subscribe();
  }

  onEditClick(task : TaskDetails) {
    console.log("Working" , task);
    this.onEditClickTask.emit(task);
  }
}
