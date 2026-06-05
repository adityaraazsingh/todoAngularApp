package com.todo.backend.repo;

import com.todo.backend.entity.userEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface usersRepository extends JpaRepository<userEntity , Long> {
}
