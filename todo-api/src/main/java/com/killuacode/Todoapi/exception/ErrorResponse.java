package com.killuacode.Todoapi.exception;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private String error;
    private int status;
    private String message;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:SS")
    private LocalDateTime timestamp;

    private String method;
    private String path;

    private Map<String, Set<String>> validationErrors;

}
