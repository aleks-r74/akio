package com.alexportfolio.akiorestserver.repository.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter @Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name="authorities")
@IdClass(AuthoritiesEnt.AuthoritiesEntId.class)
public class AuthoritiesEnt implements Serializable {

    @Id @NonNull
    String username;
    @Id @NonNull  @Enumerated(EnumType.STRING)
    Authority authority;

    @ManyToOne
    @JoinColumn(name = "username", insertable = false, updatable = false)
    UserEnt user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthoritiesEnt that = (AuthoritiesEnt) o;
        return Objects.equals(username, that.username) && Objects.equals(authority, that.authority);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, authority);
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuthoritiesEntId implements Serializable {
        private String username;
        private Authority authority;
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            AuthoritiesEntId that = (AuthoritiesEntId) o;
            return Objects.equals(username, that.username) && Objects.equals(authority, that.authority);
        }

        @Override
        public int hashCode() {
            return Objects.hash(username, authority);
        }
    }
}
