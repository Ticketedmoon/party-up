package com.partyup.usermanagement.user.application.domain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long userID;

    @Column(columnDefinition = "varchar(255)", nullable = false)
    private String username;

    @Column(columnDefinition = "varchar(60)",  nullable = false)
    private String password;

    @Column(columnDefinition = "varchar(20)",  nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(columnDefinition = "int(20)",  nullable = false)
    private int level;

}
