package com.killuacode.Todoapi.todo;


import com.killuacode.Todoapi.exception.EntityNotFoundException;
import com.killuacode.Todoapi.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    private List<Todo> retrieveAllTodos(Authentication authentication) {
        var userId = getUser(authentication).getId();
        return todoRepository.findByUserId(userId);
    }

    public Todo retrieveTodo(Authentication authentication, Integer todoId) {
        var userId = getUser(authentication).getId();
        return todoRepository
                .findByIdForSpecificUser(userId, todoId)
                .orElseThrow(() -> new EntityNotFoundException("Todo with id = " + todoId + " isn't found"));
    }

    private List<Todo> retrieveTodosByDate(Authentication authentication, LocalDate date) {
        var userId = getUser(authentication).getId();
        return todoRepository.findByTargetDate(userId, date);
    }


    public Todo createTodo(Todo todo, Authentication authentication) {
        var user = getUser(authentication);
        todo.setUser(user);
        return todoRepository.save(todo);
    }

    public void deleteTodo(Authentication authentication, Integer todoId) {
        var userId = getUser(authentication).getId();
        var todo = todoRepository.findByIdForSpecificUser(userId, todoId)
                .orElseThrow(() -> new EntityNotFoundException("Todo with id :: " + todoId + " not found for user with id :: " + userId));
        todoRepository.delete(todo);
    }


    public Todo updateTodo(Authentication authentication, Todo updatedTodo, Integer todoId) {
        var userId = getUser(authentication).getId();
        var todo = todoRepository.findByIdForSpecificUser(userId, todoId)
                .orElseThrow(() -> new EntityNotFoundException("Todo with id :: " + todoId + " not found for user with id :: " + userId));
        copyProperties(updatedTodo, todo, "id", "user");
        return todoRepository.save(todo);
    }

    public List<Todo> retrieveTodos(Authentication authentication, LocalDate targetDate) {
        if(targetDate == null) {
            return retrieveAllTodos(authentication);
        }
        return retrieveTodosByDate(authentication, targetDate);
    }

    private User getUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
