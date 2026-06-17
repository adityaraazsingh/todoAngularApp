import { Component, inject, OnInit , output , signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { appService } from '../app.service';
import { RolesEnum, userCred } from '../bo/userCreds';
import { disableDebugTools } from '@angular/platform-browser';
import { userDTO } from '../bo/userDTO';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile{
  appService = inject(appService);
  user  = signal<userDTO>({
    userName : '',
    userId: undefined ,
    manages : [],
    role : RolesEnum.USER
  });
  userId! : number;
  avatar!: string;
  onCloseDialog = output<void>();

  form = new FormGroup({
    userName : new FormControl({disabled : true, value : ''}),
    role : new FormControl<RolesEnum>(RolesEnum.USER),
    manages : new FormControl<number[]>([])
  })

  constructor(){
    this.appService.getUser().subscribe({
      next : (data)=>{
        this.userId = data.userId!,
        this.avatar = data.avatar!,
        this.user.set(data),
        this.form.patchValue(this.user());
        console.log("Profile Data recieved which is : " , data);
      }
    });
  }

  onCloseDialogEvent(){
    this.onCloseDialog.emit();
  }

  onSubmit(){
   
    this.appService.updateUser({
      userName : this.form.value.userName!,
      role : this.form.value.role!,
      manages : this.form.value.manages!,
      avatar : this.avatar,
      userId : this.userId
    }).subscribe();
  }

}
