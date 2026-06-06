package com.todo.backend.service;

import com.todo.backend.entity.userEntity;
import com.todo.backend.repo.usersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class authService implements UserDetailsService{

  @Autowired
  private usersRepository usersRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    userEntity user = usersRepository.findByUserName(username);
    return org.springframework.security.core.userdetails.User
      .withUsername(user.getUserName())
      .password(user.getPassword())
      .build();
  }
}
