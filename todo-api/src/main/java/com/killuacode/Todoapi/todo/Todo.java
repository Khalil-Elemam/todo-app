package com.killuacode.Todoapi.todo;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.killuacode.Todoapi.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Todo {

    @Id
    @GeneratedValue
    private Integer id;

    @Size(min = 5, message = "Todo content should be at least 5 Characters")
    @NotBlank
    private String content;

    @FutureOrPresent(message = "Target Date should be in the future or present")
    @NotNull
    private LocalDate targetDate;

    //@JsonProperty("isDone")
    private boolean isDone;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    @ToString.Exclude
    private User user;
}
