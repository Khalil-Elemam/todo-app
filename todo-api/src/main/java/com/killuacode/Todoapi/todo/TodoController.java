package com.killuacode.Todoapi.todo;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("users/me/todos")
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public List<Todo> retrieveAllTodos (
            @RequestParam(required = false) LocalDate date,
            Authentication authentication
    ) {
        return todoService.retrieveTodos(authentication, date);
    }

    @GetMapping("{todoId}")
    public Todo retrieveTodo(
            @PathVariable Integer todoId,
            Authentication authentication
    ) {
        return todoService.retrieveTodo(authentication, todoId);
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(
            @RequestBody @Valid Todo todo,
            Authentication authentication
    ) {
        return new ResponseEntity<>(todoService.createTodo(todo, authentication), CREATED);
    }

    @DeleteMapping("{todoId}")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable Integer todoId,
            Authentication authentication
    ) {
        todoService.deleteTodo(authentication, todoId);
        return new ResponseEntity<>(NO_CONTENT);
    }


    @PutMapping("{todoId}")
    public ResponseEntity<Todo> updateTodo(
            @RequestBody @Valid Todo todo,
            @PathVariable Integer todoId,
            Authentication authentication
    ) {
        return new ResponseEntity<>(todoService.updateTodo(authentication, todo, todoId), OK);
    }

}
