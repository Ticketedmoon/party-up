package com.partyup.usermanagement.user.infrastructure.persistence;

import com.partyup.usermanagement.user.application.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value =
                "SELECT * " +
                "FROM user u " +
                "WHERE u.username = :username ", nativeQuery = true)
    User findUserByUsername(@Param("username") String username);
}
