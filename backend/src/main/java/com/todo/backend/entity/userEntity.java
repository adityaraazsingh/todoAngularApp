package com.todo.backend.entity;

import com.todo.backend.Enum.rolesEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

// TODO : WHy getter setter not working???
@Data
@Setter
@Getter
@Entity
public class userEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;
  private String userName;
  private String password;
  @Lob
  private byte[] avatar;

  @Enumerated(EnumType.STRING)
  private rolesEnum role;

  public rolesEnum getRole() {
    return role;
  }

  public void setRole(rolesEnum role) {
    this.role = role;
  }

  private Long[] manages;

  public Long getUserId() {
    return userId;
  }

  public Long[] getManages() {
    return manages;
  }

  public void setManages(Long[] manages) {
    this.manages = manages;
  }

  public void setUser_id(Long userId) {
    this.userId = userId;
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

  public byte[] getAvatar() {
    return avatar;
  }

  public void setAvatar(byte[] avatar) {
    this.avatar = avatar;
  }
}
