package com.alexportfolio.akiorestserver.controllers.dto.users;

import com.alexportfolio.akiorestserver.repository.entities.AuthoritiesEnt;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.repository.entities.UserEnt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class UserRequestDto {
    String username;
    String password;
    List<Authority> authorities;

    public UserEnt getUserEnt(){
        var user =  new UserEnt(username,password,true);
        List<AuthoritiesEnt> authList = authorities.stream()
                .map(auth->{
                    var ent = new AuthoritiesEnt(username,auth);
                    //ent.setUser(user);
                    return ent;
                })
                .toList();
        user.setAuthorities(authList);
        return user;
    }
}
