package com.killuacode.Todoapi.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.killuacode.Todoapi.todo.Todo;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "_user")
public class User implements UserDetails{

    @Id
    @GeneratedValue
    private Integer id;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    @ToString.Exclude
    private List<Todo> todoList;

    private boolean enabled;

    private boolean locked;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptySet();
    }



    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
