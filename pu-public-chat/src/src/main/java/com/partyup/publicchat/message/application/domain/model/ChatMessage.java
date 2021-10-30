package com.partyup.publicchat.message.application.domain.model;

import com.partyup.publicchat.message.application.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class ChatMessage {
    private MessageType type;
    private String content;
    private UserDto sender;
    private String time;
}
