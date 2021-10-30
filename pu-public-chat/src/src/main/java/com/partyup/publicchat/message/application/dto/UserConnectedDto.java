package com.partyup.publicchat.message.application.dto;

import com.partyup.publicchat.message.application.domain.model.ChatMessage;
import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class UserConnectedDto {
    private ChatMessage chatMessage;
    private Map<String, String> connectedUsers;
}
