package com.partyup.publicchat.message.application.service;

import com.partyup.application.domain.dto.user.UserDTO;
import com.partyup.application.domain.entity.ChatMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MessageService {

    private final List<ChatMessage> messageLog = new ArrayList<>();
    private final Map<String, String> connectedUsers = new TreeMap<>();

    public void addMessage(ChatMessage message) {
        log.info("Message Service: Received message {}", message);
        messageLog.add(message);
        log.info("Message Service: Added new message. Message Log: {}", messageLog);
    }

    public void addNewConnectedUser(UserDTO userDTO) {
        connectedUsers.put(userDTO.getUserId(), userDTO.getUsername());
    }

    public void removeConnectedUser(UserDTO userDTO) {
        connectedUsers.remove(userDTO.getUserId());
        log.info("User with ID {} has been removed", userDTO.getUserId());
    }

    public Map<String, String> getConnectedUsers() {
        return connectedUsers;
    }
}
