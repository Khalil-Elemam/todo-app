package com.killuacode.Todoapi.auth;

public record AccountActivationResponse(
        boolean activated,
        boolean wasActivated
) {
}
