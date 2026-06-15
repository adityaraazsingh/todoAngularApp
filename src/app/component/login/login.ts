import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { appService } from '../../app.service';
import { authCred } from '../../bo/authCreds';
import { Router } from '@angular/router';
import { RolesEnum, userCred } from '../../bo/userCreds';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  isLoggingIn = true ;
  appService = inject(appService);
  router = inject(Router);
  loginCred! : authCred;
  RolesEnum = RolesEnum;
  users! : userCred[];
  selectedFile: File | null = null;

  form = new FormGroup({
    userName : new FormControl('aditya' ,[Validators.required]),
    password : new FormControl('123123'),
    role: new FormControl(RolesEnum.USER),
    assests : new FormControl(),
    manages : new FormControl<number[]>([])
  })

  ngOnInit(): void {
    this.appService.getAllUser().subscribe({
      next : (data) => {
        this.users = data;
      }
    })
  }

  onSubmit(){
    if(this.isLoggingIn){
      this.appService.logIn({
        userName : this.form.value.userName! ,
        password : this.form.value.password!
      }).subscribe({
        next : (val) => {
          window.localStorage.setItem('saved-token',JSON.stringify({
              "token":val
          }))
          this.router.navigate(['/']);
        }
      });
    }else{
      const formData = new FormData();

      formData.append('userName', this.form.value.userName!);
      formData.append('password', this.form.value.password!);
      formData.append('role', this.form.value.role!);

      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile); // 🔥 THIS is the file
      }

      this.form.value.manages?.forEach((id: number) => {
        formData.append('manages', id.toString());
      });
      console.log("Form Data: ", formData);
      this.appService.signUp(formData).subscribe({
        next : (data) =>{
          console.log("Signned Up ",data.valueOf);
          window.alert("Signned Up Successfully, Please Log In Now");
        }
      
      });
    }
  }

  onClick() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
  }

}
