package com.todo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class taskEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private  int userId;
  private String title;
  private String description;
  private Date date;
  private boolean completed;

}
