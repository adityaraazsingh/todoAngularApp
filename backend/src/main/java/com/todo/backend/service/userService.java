package com.todo.backend.service;

import com.todo.backend.entity.userEntity;
import com.todo.backend.repo.usersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class userService{

  @Autowired
  private usersRepository usersRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  public List<userEntity> findAll() {
    return usersRepository.findAll();
  }

  public userEntity saveUser(userEntity user){
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return usersRepository.save(user);
  }
}
