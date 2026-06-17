package com.todo.backend.controllers;

import com.todo.backend.Enum.rolesEnum;
import com.todo.backend.bo.LoginCredential;
import com.todo.backend.bo.userDTO;
import com.todo.backend.entity.userEntity;
import com.todo.backend.repo.usersRepository;
import com.todo.backend.security.jwtUtil;
import com.todo.backend.service.fileService;
import com.todo.backend.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.todo.backend.security.securityConfig.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

  @Autowired
  private fileService fileService;

  @GetMapping
  private userEntity getUser(@RequestParam Long id){
    return this.userRepository.findByUserId(id);
  }

  @GetMapping("/role")
  private rolesEnum getUsersRole(@RequestParam String userName){
    rolesEnum role = this.userRepository.findByUserName(userName).getRole();
    return role;
  }

  @GetMapping("/all")
  private List<userEntity> getAllUsers(){
    return this.userRepository.findAll();
  }

  @PostMapping(value = "/add-user")
  private userEntity signUp( @RequestPart("user") userDTO userDto,
                             @RequestPart(value = "avatar", required = false) MultipartFile avatar) throws IOException {
    userEntity user = new userEntity();
    user.setUserName(userDto.getUserName());
    user.setPassword(userDto.getPassword());
    user.setRole(userDto.getRole());
    user.setManages(userDto.getManages());
    user.setAvatar(fileService.save(avatar,userDto.getUserName()));

    return userService.saveUser(user);
  }

  @PutMapping("/update")
  private userEntity updateUser(@RequestBody userEntity user){
    user.setPassword(this.userRepository.findByUserId(user.getUserId()).getPassword());
    return this.userRepository.save(user);
  }

  @PostMapping
  private Map<String, String> login(@RequestBody LoginCredential loginCredential){
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginCredential.getUserName(),
        loginCredential.getPassword()
      )
    );

    userEntity user = this.userRepository.findByUserName(loginCredential.getUserName());
    if(authentication.isAuthenticated()){
      String token = jwtUtil.generateToken(loginCredential.getUserName(), user.getRole() , user.getUserId());
      return Map.of("token" , token);
    }else{
      throw new RuntimeException("Invalid Credentials");
    }
  }

  @GetMapping("/manages")
  private List<userEntity> getUsersUserIsManaging(@RequestParam String userName){
    Long[] ids = this.userRepository.findByUserName(userName).getManages();System.out.println("Ids that we are fetching "+ids.toString() + "and the username we got " + userName);
    return this.userRepository.findByUserIdIn(ids);
  }

//  @GetMapping("/avatar/{id}")
//  public ResponseEntity<byte[]> getAvatarById(@PathVariable Long id){
//    userEntity user = this.userRepository.findByUserId(id);
//
//    return ResponseEntity.ok()
//      .header(HttpHeaders.CONTENT_TYPE, "image/png")
//      .body(user.getAvatar());
//  }
}
