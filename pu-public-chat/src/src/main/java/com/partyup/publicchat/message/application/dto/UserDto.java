package com.partyup.publicchat.message.application.dto;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class UserDto {

    private String userId;
    private String username;

    public UserDto(String username) {
        this.username = username;
        this.userId = UUID.randomUUID().toString();
    }

}
