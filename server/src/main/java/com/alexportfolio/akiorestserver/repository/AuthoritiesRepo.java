package com.alexportfolio.akiorestserver.repository;
import com.alexportfolio.akiorestserver.repository.entities.AuthoritiesEnt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthoritiesRepo extends JpaRepository<AuthoritiesEnt,AuthoritiesEnt.AuthoritiesEntId> {
}
