package com.todo.backend.controllers;

import com.todo.backend.bo.LoginCredential;
import com.todo.backend.entity.userEntity;
import com.todo.backend.repo.usersRepository;
import com.todo.backend.security.jwtUtil;
import com.todo.backend.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.todo.backend.security.securityConfig.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/users")
@RestController
public class usersController {

  @Autowired
  private usersRepository userRepository;

  @Autowired
  private jwtUtil jwtUtil;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private userService userService;

  @GetMapping
  private List<userEntity> getAllUsers(){
    return userRepository.findAll();
  }

  @PostMapping("/add-user")
  private userEntity signUp(@RequestBody userEntity user){
    return userService.saveUser(user);
  }

  @PostMapping
  private String login(@RequestBody LoginCredential loginCredential){
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginCredential.getUserName(),
        loginCredential.getPassword()
      )
    );

    if(authentication.isAuthenticated()){
      return jwtUtil.generateToken(loginCredential.getUserName());
    }else{
      throw new RuntimeException("Invalid Credentials");
    }
  }
}
