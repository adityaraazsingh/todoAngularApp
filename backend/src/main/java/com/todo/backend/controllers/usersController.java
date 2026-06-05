package com.todo.backend.controllers;

import com.todo.backend.entity.userEntity;
import com.todo.backend.repo.usersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/users")
@RestController
public class usersController {

  @Autowired
  private usersRepository userRepository;

  @GetMapping
  private List<userEntity> getAllUsers(){
    return userRepository.findAll();
  }
}
