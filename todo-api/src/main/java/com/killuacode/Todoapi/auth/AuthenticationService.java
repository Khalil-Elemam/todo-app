package com.killuacode.Todoapi.auth;


import com.killuacode.Todoapi.email.EmailService;
import com.killuacode.Todoapi.exception.EmailAlreadyTakenException;
import com.killuacode.Todoapi.exception.EntityNotFoundException;
import com.killuacode.Todoapi.exception.VerificationTokenExpiredException;
import com.killuacode.Todoapi.security.JwtService;
import com.killuacode.Todoapi.user.Token;
import com.killuacode.Todoapi.user.TokenRepository;
import com.killuacode.Todoapi.user.User;
import com.killuacode.Todoapi.user.UserRepository;
import io.jsonwebtoken.JwtException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static java.time.LocalDateTime.now;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;

    @Value("${spring.mail.username}")
    private String sender;

    @Value("${application.security.jwt.access-token.expiration}")
    private long accessTokenExpiration;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshTokenExpiration;

    @Value("${application.frontend.activation-url}")
    private String activationBaseUrl;


    public void register(RegisterRequest request) throws MessagingException {

        boolean isEmailTaken = userRepository.findByEmail(request.getEmail()).isPresent();

        if(isEmailTaken)
            throw new EmailAlreadyTakenException("Email is already registered");

        User user = createUser(request);
        userRepository.save(user);

        String token = createEmailVerificationToken(user);
        sendVerificationEmail(user.getEmail(), user.getFullName(), token);
    }


    public AuthenticationResponse login(
            AuthenticationRequest request,
            HttpServletResponse response
    ) {

        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword())
                );

        User user = (User) auth.getPrincipal();

        var accessToken = jwtService.generateToken(user, accessTokenExpiration);
        var refreshToken = jwtService.generateToken(user, refreshTokenExpiration);
        var cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        //cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (refreshTokenExpiration / 1000));
        response.addCookie(cookie);
        return AuthenticationResponse
                .builder()
                .accessToken(accessToken)
                .build();
    }



    private void sendVerificationEmail(String to, String name, String token) throws MessagingException {
        var activationLink = "%s?token=%s".formatted(activationBaseUrl, token);
        emailService.sendVerificationEmail(sender, to, name, activationLink);
    }

    public AccountActivationResponse activateAccount(String verificationToken) throws MessagingException {
        Token token = tokenRepository.findByToken(verificationToken)
                .orElseThrow(() -> new EntityNotFoundException("Token: " + verificationToken + " not found"));

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

    public AuthenticationResponse refresh(
            String refreshToken
    ) {
        if (refreshToken == null)
            throw new JwtException("refresh token can't be null");
        var userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("user not found"));
            if(jwtService.isTokenValid(user, refreshToken))
                return new AuthenticationResponse(jwtService.generateToken(user, accessTokenExpiration));
        }
        return null;
    }

    public void logout(
            String refreshToken,
            HttpServletResponse response
    ) {
        if (refreshToken == null)
            throw new JwtException("refresh token can't be null");
        var userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("user not found"));
            if(jwtService.isTokenValid(user, refreshToken)) {
                var cookie = new Cookie("refresh_token", null);
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                cookie.setMaxAge(0);
                //cookie.setSecure(true);
                response.addCookie(cookie);
                SecurityContextHolder.clearContext();
            }
        }
    }
}
