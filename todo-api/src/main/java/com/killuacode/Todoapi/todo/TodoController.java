package com.killuacode.Todoapi.todo;


import com.killuacode.Todoapi.user.User;
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
        return todoService.retrieveTodos(getUserId(authentication), date);
    }

    @GetMapping("{todoId}")
    public Todo retrieveTodo(
            @PathVariable Integer todoId,
            Authentication authentication
    ) {
        return todoService.retrieveTodo(getUserId(authentication), todoId);
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(
            @RequestBody @Valid Todo todo,
            Authentication authentication
    ) {
        return new ResponseEntity<>(todoService.createTodo(todo, getUserId(authentication)), CREATED);
    }

    @DeleteMapping("{todoId}")
    public ResponseEntity<Void> deleteTodo(
            Authentication authentication,
            @PathVariable Integer todoId
    ) {
        todoService.deleteTodo(getUserId(authentication), todoId);
        return new ResponseEntity<>(NO_CONTENT);
    }


    @PutMapping("{todoId}")
    public ResponseEntity<Todo> updateTodo(
            @RequestBody @Valid Todo todo,
            Authentication authentication,
            @PathVariable Integer todoId
    ) {
        return new ResponseEntity<>(todoService.updateTodo(todo, getUserId(authentication), todoId), OK);
    }

    private Integer getUserId(Authentication authentication) {
        var user = (User) authentication.getPrincipal();
        return user.getId();
    }

}
