package com.killuacode.Todoapi.auth;


import jakarta.validation.constraints.*;
import lombok.Data;


@Data
public class RegisterRequest {


    @NotBlank
    @Pattern(
            regexp = "^[a-zA-Z\\xc0-\\uFFFF]+([ '\\-]?[a-zA-Z\\xC0-\\uFFFF]+){0,2}[.]?$",
            message = "invalid firstName"
    )
    @Size(min = 3, max = 35, message = "First name length should be between 3 and 35 characters")
    private String firstName;

    @NotBlank
    @Pattern(
            regexp = "^[a-zA-Z\\xc0-\\uFFFF]+([ '\\-]?[a-zA-Z\\xC0-\\uFFFF]+){0,2}[.]?$",
            message = "invalid firstName"
    )
    @Size(min = 3, max = 35, message = "Last name length should be between 3 and 35 characters")
    private String lastName;

    @Email(message = "invalid email")
    @NotBlank(message = "invalid email")
    private String email;

    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[$#@!%^&*_=+|-]).{8,}$",
            message = "password must contains at least one capital letter, one symbol, on digit, and be at least 8 characters"
    )
    private String password;

}
