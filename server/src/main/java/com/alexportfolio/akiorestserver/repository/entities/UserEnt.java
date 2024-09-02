package com.alexportfolio.akiorestserver.repository.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="users")
@Getter @Setter
@NoArgsConstructor
public class UserEnt {
    @Id
    String username;
    String password;
    Boolean enabled ;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    List<AuthoritiesEnt> authorities;

    public UserEnt getCopy(){
        var copy = new UserEnt(username, password, enabled);
        copy.setAuthorities(authorities);
        return copy;
    }

    public UserEnt(String username, String password, Boolean enabled) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }

    public UserEnt(String username) {
        this.username = username;
    }

}
