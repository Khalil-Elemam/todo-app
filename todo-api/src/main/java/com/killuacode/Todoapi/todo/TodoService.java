package com.killuacode.Todoapi.todo;


import com.killuacode.Todoapi.user.User;
import com.killuacode.Todoapi.exception.TodoNotFoundException;
import com.killuacode.Todoapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(getClass());

    private List<Todo> retrieveAllTodos(Integer userId) {
        return todoRepository.findByUserId(userId);
    }

    public Todo retrieveTodo(Integer userId, Integer todoId) {
        return todoRepository
                .findByIdForSpecificUser(userId, todoId)
                .orElseThrow(() -> new TodoNotFoundException("Todo with id = " + todoId + " isn't found"));
    }

    private List<Todo> retrieveTodosByDate(Integer userId, LocalDate date) {
        return todoRepository.findByTargetDate(userId, date);
    }


    public Todo createTodo(Todo todo, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow();
        todo.setUser(user);
        return todoRepository.save(todo);
    }

    public void deleteTodo(Integer userId, Integer todoId) {
        todoRepository.deleteById(todoId);
    }


    public Todo updateTodo(Todo updatedTodo, Integer userId, Integer todoId) {
        User user = userRepository.findById(userId).orElseThrow();
        Todo todo = todoRepository
                .findById(todoId)
                .orElseThrow(() -> new TodoNotFoundException("Todo with id = " + todoId + " isn't found"));

        BeanUtils.copyProperties(updatedTodo, todo);
        return todoRepository.save(todo);
    }

    public List<Todo> retrieveTodos(Integer userId, LocalDate targetDate) {
        if(targetDate == null) {
            return retrieveAllTodos(userId);
        }
        return retrieveTodosByDate(userId, targetDate);
    }
}
