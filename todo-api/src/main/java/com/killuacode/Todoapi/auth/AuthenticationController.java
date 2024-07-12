package com.killuacode.Todoapi.auth;


import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(
            @RequestBody @Valid RegisterRequest request
    ) throws MessagingException {

        authenticationService.register(request);
        return new ResponseEntity<> (
                Map.of("message", "Registration successful. Please check your email to verify your account."),
                CREATED
        );
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody @Valid AuthenticationRequest request
    ) {

        return ResponseEntity.ok(authenticationService.login(request));
    }

    @GetMapping("/activate-account")
    public ResponseEntity<AccountActivationResponse> activateAccount(
            @RequestParam String token
    ) throws MessagingException {
        return ResponseEntity.ok(authenticationService.activateAccount(token));
    }

}
