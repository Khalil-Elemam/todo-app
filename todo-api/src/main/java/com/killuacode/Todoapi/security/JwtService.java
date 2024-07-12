package com.killuacode.Todoapi.security;


import com.killuacode.Todoapi.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtService {

    private final UserRepository userRepository;

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.access-token.expiration}")
    private long accessTokenExpiration;


    public Claims extractClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        Claims claims = extractClaims(token);
        return claimResolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateAccessToken(Map<String, Object> claims, UserDetails userDetails) {
        return buildToken(claims, userDetails, accessTokenExpiration);
    }

    public String generateAccessToken(UserDetails userDetails) {
        return generateAccessToken(new HashMap<>(), userDetails);
    }

    public String buildToken(
            Map<String, Object> claims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setSubject(userDetails.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = extractExpirationDate(token);
        return expirationDate.before(new Date());
    }

    public boolean isTokenValid(UserDetails userDetails, String token) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public Date extractExpirationDate(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        log.info("bytes array without encoding {}", Arrays.toString(secretKey.getBytes()));
        log.info("bytes array with encoding {}", Arrays.toString(keyBytes));
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
