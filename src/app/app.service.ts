import { afterEveryRender, AfterRenderOptions, AfterRenderRef, inject, Injectable, signal } from "@angular/core";
import { TaskDetails } from "./bo/tasksBo";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { authCred } from "./bo/authCreds";
import { RolesEnum, userCred } from "./bo/userCreds";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

@Injectable({providedIn : 'root'})

export class appService{

  private httpClient = inject(HttpClient);
  allTasks = signal<TaskDetails[]>([]);
  router = inject(Router);
  managesId! : number[];
  userName! : string;
  role! : RolesEnum;


  private loadTasks(){
    this.httpClient.get<TaskDetails[]>('http://localhost:8080/api/tasks').subscribe(
      (data)=>{
        this.allTasks.set(data || []);
      },
      (err)=>{
        window.alert(`Please Login Again ${err.message}`);
        this.logout();
      }
    );
  }

  loadTasksPerRender(){
    this.loadTasks();
  }

  mockTasks(userId : number) {
    return this.allTasks().filter(task => task.userId === userId);
  }

  getAllUser(){
      return this.httpClient.get<userCred[]>("http://localhost:8080/api/users/all");
  }

  getRoleAndUsernameOfUser() {
    const tokenObject = window.localStorage.getItem('saved-token');
    if(tokenObject){
      const token = JSON.parse(tokenObject);
      const decode: any = jwtDecode(token.token.token);
      this.role = decode.role;
      this.userName = decode.username;
    }
  }

  getRoleOfUser() : RolesEnum{
    this.getRoleAndUsernameOfUser();
    return this.role?this.role : RolesEnum.USER;
  }

  getUserYouManages(){
    return this.httpClient.get<userCred[]>("http://localhost:8080/api/users/manages", {
      params :{
        userName : this.userName
      }
    });
  }

  addAndUpdateTask(task : TaskDetails){
    return this.httpClient.put("http://localhost:8080/api/tasks/addOrUpdate",{
      userId :task.userId? task.userId : null,
      title : task.title,
      description : task.description,
      date : task.date 
    }).pipe(tap(() => this.loadTasks()));
  }

  onCompleteClick(task : TaskDetails) {
    this.allTasks.set(this.allTasks().map((t) => task.id===t.id ? {...t , completed : true} : t));

    return this.httpClient.put("http://localhost:8080/api/tasks/addOrUpdate",{
      id : task.id,
      userId :task.userId,
      title : task.title,
      description : task.description,
      date : task.date ,
      completed: true
    });
  }

  logIn(logincred : authCred){
    this.userName = logincred.userName;
    return this.httpClient.post("http://localhost:8080/api/users",logincred);
  }

  logout(){
    window.localStorage.removeItem("saved-token");
    this.router.navigateByUrl('/login');
  }

  signUp(form : FormData){
    return this.httpClient.post("http://localhost:8080/api/users/add-user",form);
  }

}