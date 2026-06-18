import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { appService } from '../../app.service';
import { authCred } from '../../bo/authCreds';
import { Router } from '@angular/router';
import { RolesEnum, userCred } from '../../bo/userCreds';
import { MatListModule } from '@angular/material/list';
import { MatSelectionList } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,MatListModule , MatSelectionList , MatRadioModule],
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

  hasError = signal<boolean>(false);

  form = new FormGroup({
    userName : new FormControl('ADMIN_adi' ,[Validators.required]),
    password : new FormControl('123123'),
    role: new FormControl(RolesEnum.USER),
    assets : new FormControl(),
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
        },
        error : () =>{
          this.hasError.set(true)
        }
      });
    }else{
      const formData = new FormData();
      const payload ={
        userName : this.form.value.userName! ,
        password : this.form.value.password!,
        role : this.form.value.role!,
        manages : this.form.value.manages
      };

      formData.append('user' , new Blob([JSON.stringify(payload)], { type: 'application/json' }));

      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile); 
      }

      this.form.value.manages?.forEach((id: number) => {
        formData.append('manages', id.toString());
      });
      console.log("Form Data: ", formData);
      this.appService.signUp(formData).subscribe({
        next : (data) =>{
          console.log("Signned Up ",data.valueOf);
          window.alert("Signned Up Successfully, Please Log In Now");
        },
        error : () =>{
          this.hasError.set(true)
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
