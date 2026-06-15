package com.todo.backend.repo;

import com.todo.backend.entity.userEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface usersRepository extends JpaRepository<userEntity , Long> {
  public userEntity findByUserName(String name);
  public List<userEntity> findByUserIdIn(Long[] ids);
  public userEntity findByUserId(Long id);
}

