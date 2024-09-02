package com.alexportfolio.akiorestserver.repository;

import com.alexportfolio.akiorestserver.repository.entities.UserEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<UserEnt, String> {
}
