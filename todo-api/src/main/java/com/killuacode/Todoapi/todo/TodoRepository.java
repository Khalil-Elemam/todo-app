package com.killuacode.Todoapi.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface TodoRepository extends JpaRepository<Todo, Integer> {

    @Query(value = "select t from Todo t where t.user.id = :userId")
    List<Todo> findByUserId(Integer userId);


    @Query(value = "select t from Todo t where t.user.id = :userId and t.targetDate = :date")
    List<Todo> findByTargetDate(Integer userId, LocalDate date);


    @Query(value = "select t from Todo t where t.user.id = :userId and t.id = :todoId")
    Optional<Todo> findByIdForSpecificUser(Integer userId, Integer todoId);

}
