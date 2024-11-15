package com.killuacode.Todoapi.auth;


import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

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
            @RequestBody @Valid AuthenticationRequest request,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(authenticationService.login(request, response));
    }

    @GetMapping("/activate-account")
    public ResponseEntity<AccountActivationResponse> activateAccount(
            @RequestParam String token
    ) throws MessagingException {
        return ResponseEntity.ok(authenticationService.activateAccount(token));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refresh(
            @CookieValue(value = "refresh_token", required = false) String refreshToken,
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(authenticationService.refresh(refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(value = "refresh_token", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        authenticationService.logout(refreshToken, response);
        return new ResponseEntity<>(OK);
    }

}
