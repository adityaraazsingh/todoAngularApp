import { Component, EventEmitter, Output , output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {

  
  title='';
  description='';
  date='';

  // @Output() newTask = new EventEmitter();
  // @Output() closeDialog = new EventEmitter<void>();
  newTask = output<{title : string , description : string , date : string}>();
  closeDialog = output<void>();

  onSubmit() {
    this.newTask.emit({ title: this.title, description: this.description, date: this.date });
    this.closeDialog.emit();
  }

  onClose() {
    this.closeDialog.emit();
  }

}
