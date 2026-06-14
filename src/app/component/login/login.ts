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

  form = new FormGroup({
    userName : new FormControl('aditya' ,[Validators.required]),
    password : new FormControl('123123'),
    role: new FormControl(RolesEnum.USER),
    assests : new FormControl(),
    manages : new FormControl()
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
      this.appService.signUp({
        userName : this.form.value.userName!,
        password: this.form.value.password!,
        avatar: this.form.value.assests,
        manages : [this.form.value.manages],
        role : this.form.value.role!
      }).subscribe({
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
}
