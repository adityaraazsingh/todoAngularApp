package com.todo.backend.repo;

import com.todo.backend.entity.taskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface taskRepository extends JpaRepository<taskEntity, Long> {
}
