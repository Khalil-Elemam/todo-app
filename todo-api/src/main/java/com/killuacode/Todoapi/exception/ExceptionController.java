package com.killuacode.Todoapi.exception;


import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class ExceptionController {

    //todo -- refactor this mess

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {

        Map<String, Set<String>> validationErrors = new HashMap<>();
        ex.getFieldErrors()
                .forEach(fieldError -> {
                    var field = fieldError.getField();
                    var oldErrors = validationErrors.getOrDefault(field, new HashSet<>());
                    oldErrors.add(fieldError.getDefaultMessage());
                    validationErrors.put(fieldError.getField(), oldErrors);
                });

        var error = ErrorResponse
                .builder()
                .error(BAD_REQUEST.name())
                .status(ex.getStatusCode().value())
                .timestamp(LocalDateTime.now())
                .validationErrors(validationErrors)
                .path(request.getRequestURI())
                .method(request.getMethod())
                .build();

        return new ResponseEntity<>(error, ex.getStatusCode());
    }

    @ExceptionHandler(EmailAlreadyTakenException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreadyTakenException(EmailAlreadyTakenException ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.CONFLICT;
        var error = ErrorResponse
                .builder()
                .message(ex.getMessage())
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .build();

        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(TodoNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleTodoNotFoundException(TodoNotFoundException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        var error = ErrorResponse
                .builder()
                .message(ex.getMessage())
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .build();

        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(TokenNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleTokenNotFoundException(TokenNotFoundException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        var error = ErrorResponse
                .builder()
                .message(ex.getMessage())
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .build();

        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtExceptions(JwtException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        var error = ErrorResponse
                .builder()
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        var error = ErrorResponse
                .builder()
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .message("Username or password aren't correct")
                .build();
        return new ResponseEntity<>(error, status);
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        HttpStatus status = FORBIDDEN;
        var error = ErrorResponse
                .builder()
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ErrorResponse> handleAccountDisabledException(HttpServletRequest request) {
        var status = FORBIDDEN;
        var error = ErrorResponse
                .builder()
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .message("Your account is disabled, please check your email to activate")
                .build();
        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(VerificationTokenExpiredException.class)
    public ResponseEntity<ErrorResponse> handleVerificationTokenExpiredException(VerificationTokenExpiredException ex, HttpServletRequest request) {
        var status = BAD_REQUEST;
        return new ResponseEntity<>(getError(ex, request, status), status);
    }




    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleServerExceptions(Exception ex, HttpServletRequest request) {
        var status = INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(getError(ex, request, status), status);
    }

    private static ErrorResponse getError(Exception ex, HttpServletRequest request, HttpStatus status) {
        return ErrorResponse
                .builder()
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .message(ex.getMessage())
                .build();
    }



}
