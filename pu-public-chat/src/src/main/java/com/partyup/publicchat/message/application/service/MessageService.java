package com.partyup.publicchat.message.application.service;

import com.partyup.publicchat.message.application.domain.model.ChatMessage;
import com.partyup.publicchat.message.application.dto.UserDto;
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

    public void addNewConnectedUser(UserDto userDto) {
        connectedUsers.put(userDto.getUserId(), userDto.getUsername());
    }

    public void removeConnectedUser(UserDto userDto) {
        connectedUsers.remove(userDto.getUserId());
        log.info("User with ID {} has been removed", userDto.getUserId());
    }

    public Map<String, String> getConnectedUsers() {
        return connectedUsers;
    }
}
