import { inject, Injectable, signal } from "@angular/core";
import { TaskDetails } from "./bo/tasksBo";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";
import { authCred } from "./bo/authCreds";
import { UserDetails } from "./bo/userBo";
import { userCred } from "./bo/userCreds";

@Injectable({providedIn : 'root'})

export class appService{

  private httpClient = inject(HttpClient);
  allTasks = signal<TaskDetails[]>([]);


  private loadTasks(){
    this.httpClient.get<TaskDetails[]>('http://localhost:8080/api/tasks').subscribe(
      (data)=>{
        this.allTasks.set(data || []);
      }
    );
  }

  loadTasksPerRender(){
    this.loadTasks();
  }

  mockTasks(userId : number) {
    return this.allTasks().filter(task => task.userId === userId);
  }

  addAndUpdateTask(task : TaskDetails){
    // this.loadTasks();
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
    this.loadTasks();
    return this.httpClient.post("http://localhost:8080/api/users",logincred);
  }

  signUp(user : userCred){
    return this.httpClient.post("http://localhost:8080/api/users/add-user",user);
  }

}