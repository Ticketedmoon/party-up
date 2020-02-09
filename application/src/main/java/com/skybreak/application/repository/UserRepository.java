package com.skybreak.application.repository;

import com.skybreak.application.domain.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query(value = "SELECT * FROM users u WHERE u.username = username", nativeQuery = true)
    User findUserByUsername(@Param("username") String username);
}
