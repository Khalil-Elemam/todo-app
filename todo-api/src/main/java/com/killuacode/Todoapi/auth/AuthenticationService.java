package com.killuacode.Todoapi.auth;


import com.killuacode.Todoapi.email.EmailService;
import com.killuacode.Todoapi.exception.EmailAlreadyTakenException;
import com.killuacode.Todoapi.exception.TokenNotFoundException;
import com.killuacode.Todoapi.exception.VerificationTokenExpiredException;
import com.killuacode.Todoapi.security.JwtService;
import com.killuacode.Todoapi.user.Token;
import com.killuacode.Todoapi.user.TokenRepository;
import com.killuacode.Todoapi.user.User;
import com.killuacode.Todoapi.user.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.UUID;

import static java.time.LocalDateTime.now;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;

    @Value("${spring.mail.username}")
    private String sender;


    public void register(RegisterRequest request) throws MessagingException {

        boolean isEmailTaken = userRepository.findByEmail(request.getEmail()).isPresent();

        if(isEmailTaken)
            throw new EmailAlreadyTakenException("Email is already registered");

        User user = createUser(request);
        userRepository.save(user);

        String token = createEmailVerificationToken(user);
        sendVerificationEmail(user.getEmail(), user.getFullName(), token);
    }


    public AuthenticationResponse login(AuthenticationRequest request) {

        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword())
                );

        User user = (User) auth.getPrincipal();

        String accessToken = jwtService.generateAccessToken(user);
        return AuthenticationResponse
                .builder()
                .accessToken(accessToken)
                .build();
    }



    private void sendVerificationEmail(String to, String name, String token) throws MessagingException {
        String activationLink = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/auth/activate-account")
                .queryParam("token", token)
                .toUriString();
        emailService.sendVerificationEmail(sender, to, name, activationLink);
    }

    public AccountActivationResponse activateAccount(String verificationToken) throws MessagingException {
        Token token = tokenRepository.findByToken(verificationToken)
                .orElseThrow(() -> new TokenNotFoundException("Token not found"));

        User user = token.getUser();

        if(user.isEnabled())
            return new AccountActivationResponse(true, true);

        if(token.getExpiredAt().isAfter(now())) {
            user.setEnabled(true);
            userRepository.save(user);
            return new AccountActivationResponse(true, false);
        }

        String newToken = createEmailVerificationToken(user);
        sendVerificationEmail(user.getEmail(), user.getFullName(), newToken);
        throw new VerificationTokenExpiredException("The verification token has expired. Please request a new one.");
    }

    private String createEmailVerificationToken(User user) {
        String uuid = UUID.randomUUID().toString();
        Token token = Token.builder()
                .token(uuid)
                .expiredAt(now().plusDays(1))
                .user(user)
                .build();
        tokenRepository.save(token);
        return uuid;
    }

    private User createUser(RegisterRequest request) {
        return User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
    }
}
