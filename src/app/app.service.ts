import { inject, Injectable, signal } from "@angular/core";
import { TaskDetails } from "./bo/tasksBo";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

@Injectable({providedIn : 'root'})

export class appService{

  private httpClient = inject(HttpClient);
  allTasks = signal<TaskDetails[]>([]);

  constructor(){
    this.loadTasks();
  }

  private loadTasks(){
    this.httpClient.get<TaskDetails[]>('http://localhost:8080/api/tasks').subscribe(
      (data)=>{
        this.allTasks.set(data || []);
      }
    );
  }

  mockTasks(userId : number) {
    return this.allTasks().filter(task => task.userId === userId);
  }

  addAndUpdateTask(task : TaskDetails){
    return this.httpClient.put("http://localhost:8080/api/tasks/addOrUpdate",{
      userId :task.userId? task.userId : null,
      title : task.title,
      description : task.description,
      date : task.date 
    });
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

}