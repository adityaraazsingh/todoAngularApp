package com.todo.backend.controllers;

import com.todo.backend.entity.taskEntity;
import com.todo.backend.repo.taskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin
@RequestMapping("/api/tasks")
@RestController
public class taskController {

  @Autowired
  private taskRepository taskRepository;

  @GetMapping
  private List<taskEntity> getAllTasks(){
    return taskRepository.findAll();}

  @PutMapping("/addOrUpdate")
  private taskEntity updateOrAddTask(@RequestBody taskEntity task){
    return this.taskRepository.save(task);
  }
}
