import { Component, computed, inject, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { appService } from '../app.service';
import { RolesEnum, userCred } from '../bo/userCreds';
import { userDTO } from '../bo/userDTO';
import { MatListModule } from '@angular/material/list';
import { MatSelectionList } from '@angular/material/list';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, MatIconModule, MatListModule, MatSelectionList],

  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  appService = inject(appService);
  user = signal<userDTO>({
    userName: '',
    userId: undefined,
    manages: [],
    role: RolesEnum.USER
  });
  userId!: number;
  avatar!: string;
  onCloseDialog = output<void>();
  users!: userCred[];
  disableSaveBtn: boolean = false;
  isUnique = signal<Boolean>(false);
  editingUserName: boolean = false;

  form = new FormGroup({
    userName: new FormControl({ disabled: true, value: '' }),
    role: new FormControl<RolesEnum>({ value: RolesEnum.USER, disabled: true }),
    manages: new FormControl<number[]>([])
  })

  avatarUrl = computed(()=>{
    if(this.user()==null) return;
    const url = "http://localhost:8080/uploads/"+this.user().userName+".jpg";
    return url;
  })

  constructor() {
    this.appService.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
        this.patchForm();
      }
    })
  }

  ngOnInit(): void {
    this.onUserNameUpdate();

    this.form.valueChanges.subscribe(value => {
      console.log('Form changed:', value);

      this.disableSaveBtn = false;
    });
  }

  patchForm() {
    this.appService.getUser().subscribe({
      next: (data) => {
        this.userId = data.userId!,
          this.avatar = data.avatar!,
          this.user.set(data),
          this.form.patchValue({
            userName: data.userName,
            role: data.role,
            manages: data.manages
          });
      }
    });
  }

  onCloseDialogEvent() {
    this.onCloseDialog.emit();
  }

  onSubmit() {
    this.appService.updateUser({
      userName: this.form.getRawValue().userName!,
      role: this.form.getRawValue().role!,
      manages: this.form.value.manages!,
      avatar: this.avatar,
      userId: this.userId
    }).subscribe(
      {
        next: () => {
          window.alert("Profile Updated Successfully");
          this.appService.userUpdated.update(x => x + 1);
        }
      }
    );
    this.onCloseDialogEvent();
  }

  onEditUserNameClick() {
    const userNameControl = this.form.controls.userName;
    userNameControl.enable();
    userNameControl.markAsDirty();
    this.disableSaveBtn = !this.disableSaveBtn;
    this.editingUserName = true;

  }

  onUserNameUpdate() {
    const userNameControl = this.form.controls.userName;
    userNameControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((data) => {
      if (this.editingUserName) {
        this.appService.checkUniqueUsername(data!).subscribe(data => {
          this.isUnique.set(data)
          if (this.isUnique() === true) {
            this.disableSaveBtn = false;
          } else {
            this.disableSaveBtn = true;
          }
        })
      }
    })
  }

  // onUserNameUpdate() {
  //   const userNameControl = this.form.controls.userName;

  //   userNameControl.valueChanges.pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap(value => this.appService.checkUniqueUsername(value!))
  //   ).subscribe(isUnique => {
  //     this.isUnique.set(isUnique);
  //     if(isUnique === true) {
  //       this.disableSaveBtn = false;
  //     }
  //   });
  // }

}
