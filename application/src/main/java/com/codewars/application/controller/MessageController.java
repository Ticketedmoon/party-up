package com.codewars.application.controller;

import com.codewars.application.domain.entity.ChatMessage;
import com.codewars.application.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    /*
     * This MessageMapping annotated method will be handled by
     * SimpAnnotationMethodMessageHandler and after that the Message will be
     * forwarded to Broker channel to be forwarded to the client via WebSocket
     */
    @MessageMapping("/chat.send")
    @SendTo("/topic/chat")
    public ChatMessage sendMessage(@Payload final ChatMessage chatMessage) {
        messageService.addMessage(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.newUser")
    @SendTo("/topic/chat")
    public ChatMessage newUserJoined(@Payload final ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        chatMessage.setContent(String.format("User %s has joined the session.", chatMessage.getSender()));
        return chatMessage;
    }

}
