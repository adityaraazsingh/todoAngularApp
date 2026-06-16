import { Component, EventEmitter, inject, Output, output, input, DestroyRef, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { appService } from '../../../app.service';
import { TaskDetails } from '../../../bo/tasksBo';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {

  userId = input.required<number>();

  id = input<number>();
  title = input<string>("");
  description = input<string>("");
  date = input<string>("");

  form = new FormGroup({
    title : new FormControl(this.title(),[Validators.required]),
    description : new FormControl(this.description(),[Validators.required]),
    date : new FormControl(this.date(),[Validators.required])
  });

  constructor() {
    effect(() => {
        this.form.patchValue({
          title: this.title(),
          description: this.description(),
          date: this.date()
        });
      });
    }

  newTask = output<{ title: string, description: string, date: string }>();
  closeDialog = output<void>();
  destroyRef = inject(DestroyRef);
  appService = inject(appService);

  onSubmit() {
    console.log(this.id() , " Id is there ")
    const task :  TaskDetails = {
      id:this.id(),
      userId : this.userId(),
      title : this.form.value.title!,
      description : this.form.value.description!,
      date : this.form.value.date!
    }
    const subscription = this.appService.addAndUpdateTask(task).subscribe(
      {
        next: ()=>{
          
        }
      }
    );
    this.closeDialog.emit();
    // this.destroyRef.onDestroy(()=> subscription.unsubscribe());
  }

  onClose() {
    this.closeDialog.emit();
  }

}
