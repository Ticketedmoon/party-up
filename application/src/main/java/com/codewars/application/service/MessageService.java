package com.codewars.application.service;

import com.codewars.application.domain.entity.ChatMessage;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    private final List<ChatMessage> messageLog = new ArrayList<>();

    public void addMessage(ChatMessage message) {
        logger.info("Message Service: Received message {}", message);
        messageLog.add(message);
        logger.info("Message Service: Added new message. Message Log: {}", messageLog);
    }

}
