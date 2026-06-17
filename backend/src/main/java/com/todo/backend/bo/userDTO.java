package com.todo.backend.bo;

import com.todo.backend.Enum.rolesEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

public class userDTO {
  private String userName;
  private String password;
  private rolesEnum role;
  private Long[] manages;

  public Long[] getManages() {
    return manages;
  }

  public void setManages(Long[] manages) {
    this.manages = manages;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public rolesEnum getRole() {
    return role;
  }

  public void setRole(rolesEnum role) {
    this.role = role;
  }
}
