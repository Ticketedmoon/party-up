package com.partyup.application.domain.dto.user;

import com.partyup.application.domain.entity.ChatMessage;
import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class UserConnectedDTO {
    private ChatMessage chatMessage;
    private Map<String, String> connectedUsers;
}
