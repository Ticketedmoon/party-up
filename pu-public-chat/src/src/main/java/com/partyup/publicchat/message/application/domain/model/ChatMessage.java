package com.partyup.publicchat.message.application.domain.model;

import com.partyup.application.domain.dto.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class ChatMessage {

    private MessageType type;
    private String content;
    private UserDTO sender;
    private String time;

}
