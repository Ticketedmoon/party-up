package com.partyup.application.listeners;

import com.partyup.application.domain.dto.UserDTO;
import com.partyup.application.domain.entity.ChatMessage;
import com.partyup.application.domain.enums.MessageType;
import com.partyup.application.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    private final SimpMessageSendingOperations messagingTemplate;
    private final MessageService messageService;

    @Autowired
    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate, MessageService messageService) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;

    }

    @EventListener
    public void handleWebSocketConnectListener(final SessionConnectedEvent event) {
        logger.info("Connection Event: Received a new web socket connection with event {}", event);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(final SessionDisconnectEvent event) {
        logger.info("Disconnection Event: Received a new web socket disconnection with event {}", event);
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        final UserDTO user = (UserDTO) headerAccessor.getSessionAttributes().get("username");
        messageService.removeConnectedUser(user);

        final ChatMessage chatMessage = ChatMessage.builder()
                .type(MessageType.DISCONNECT)
                .content(String.format("User %s has disconnected from the session.", user.getUsername()))
                .sender(user)
                .build();
        messagingTemplate.convertAndSend("/topic/chat/userDisconnected", chatMessage);
    }
}
