package com.codewars.application.service;

import com.codewars.application.domain.dto.UserDTO;
import com.codewars.application.domain.entity.ChatMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    private final List<ChatMessage> messageLog = new ArrayList<>();
    private final Map<String, String> connectedUsers = new TreeMap<>();

    public void addMessage(ChatMessage message) {
        logger.info("Message Service: Received message {}", message);
        messageLog.add(message);
        logger.info("Message Service: Added new message. Message Log: {}", messageLog);
    }

    public void addNewConnectedUsers(UserDTO userDTO) {
        connectedUsers.put(userDTO.getUserId(), userDTO.getUsername());
    }

    public Map<String, String> getConnectedUsers() {
        return connectedUsers;
    }
}
