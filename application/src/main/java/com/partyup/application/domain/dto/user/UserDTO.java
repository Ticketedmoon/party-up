package com.partyup.application.domain.dto.user;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class UserDTO {

    private String userId;
    private String username;

    public UserDTO(String username) {
        this.username = username;
        this.userId = UUID.randomUUID().toString();
    }

}
