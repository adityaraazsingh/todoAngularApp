import { Component, EventEmitter, inject, Output, output, input, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { appService } from '../../../app.service';
import { TaskDetails } from '../../../bo/tasksBo';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {

  userId = input.required<number>();
  title = '';
  description = '';
  date = '';

  newTask = output<{ title: string, description: string, date: string }>();
  closeDialog = output<void>();
  destroyRef = inject(DestroyRef);
  appService = inject(appService);

  onSubmit() {
    const task :  TaskDetails = {
      userId : this.userId(),
      title : this.title,
      description : this.description,
      date : this.date
    }
    const subscription = this.appService.addAndUpdateTask(task).subscribe();
    this.closeDialog.emit();
    // this.destroyRef.onDestroy(()=> subscription.unsubscribe());
  }

  onClose() {
    this.closeDialog.emit();
  }

}
