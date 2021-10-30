package com.partyup.publicchat.message.application.controller;

import com.partyup.application.domain.dto.user.UserConnectedDTO;
import com.partyup.application.domain.entity.ChatMessage;
import com.partyup.application.service.MessageService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

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
    @SendTo("/topic/chat/newUser")
    public UserConnectedDTO newUserJoined(@Payload final ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        chatMessage.setContent(String.format("User %s has joined the session.", chatMessage.getSender().getUsername()));
        chatMessage.getSender().setUserId(UUID.randomUUID().toString());

        // TOOD: Maybe consider moving this logic to some utility service, OR find a way to automatically parse it on request.
        messageService.addNewConnectedUser(chatMessage.getSender());

        UserConnectedDTO userConnectedDTO = new UserConnectedDTO();
        userConnectedDTO.setConnectedUsers(messageService.getConnectedUsers());
        userConnectedDTO.setChatMessage(chatMessage);
        return userConnectedDTO;
    }

}
