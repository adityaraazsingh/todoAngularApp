import { Component, Input } from '@angular/core';
import { Cards } from "../../../reuseable/cards/cards";
import { TaskDetails } from '../../../bo/tasksBo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [Cards, DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  @Input({required: true}) task!: TaskDetails;

  onCompleteClick() {
    this.task.completed = true;
  }
}
