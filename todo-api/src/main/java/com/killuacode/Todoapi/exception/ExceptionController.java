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
        var status = CONFLICT;
        return new ResponseEntity<>(getError(ex, request, status), status);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleTokenNotFoundException(EntityNotFoundException ex, HttpServletRequest request) {
        var status = NOT_FOUND;
        return new ResponseEntity<>(getError(ex, request, status), status);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtExceptions(JwtException ex, HttpServletRequest request) {
        var status = UNAUTHORIZED;
        return new ResponseEntity<>(getError(ex, request, status), status);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        return new ResponseEntity<>(getError(request, status, "Username or password aren't correct"), status);
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        HttpStatus status = FORBIDDEN;
        return new ResponseEntity<>(getError(ex, request, status), status);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ErrorResponse> handleAccountDisabledException(HttpServletRequest request) {
        var status = FORBIDDEN;
        return new ResponseEntity<>(
                getError(request, status, "Your account is disabled, please check your email to activate"),
                status
        );
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

    private ErrorResponse getError(Exception ex, HttpServletRequest request, HttpStatus status) {
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

    private ErrorResponse getError(
            HttpServletRequest request,
            HttpStatus status,
            String msg
    ) {
        return ErrorResponse
                .builder()
                .error(status.name())
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .message(msg)
                .build();
    }



}
