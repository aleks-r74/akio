package com.alexportfolio.akiorestserver.controllers.dto.users;

import com.alexportfolio.akiorestserver.repository.entities.Authority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class UsersResponseDto {
    String username;
    List<Authority> authorities;
    public UsersResponseDto(Map.Entry<String,List<Authority>> entry){
        this.username = entry.getKey();
        this.authorities = entry.getValue();
    }
}
