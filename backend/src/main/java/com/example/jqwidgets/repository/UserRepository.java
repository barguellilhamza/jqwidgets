package com.example.jqwidgets.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jqwidgets.model.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
