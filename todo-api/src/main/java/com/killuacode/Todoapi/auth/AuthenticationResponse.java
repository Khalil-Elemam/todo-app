package com.killuacode.Todoapi.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class AuthenticationResponse {

    private String accessToken;
}
