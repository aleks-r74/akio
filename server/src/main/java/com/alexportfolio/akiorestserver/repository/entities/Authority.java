package com.alexportfolio.akiorestserver.repository.entities;

import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public enum Authority {
    ROLE_EMPLOYEE(1),
    ROLE_SUPERUSER(2),
    ROLE_ADMIN(3);
    private final int access_level;
    Authority(int access_level){
        this.access_level = access_level;
    }
    public static List<String> getNames(){
        return Arrays.stream(Authority.values())
                .map(Enum::name)
                .toList();
    }
    public int getAccessLevel(){
        return access_level;
    }
}
