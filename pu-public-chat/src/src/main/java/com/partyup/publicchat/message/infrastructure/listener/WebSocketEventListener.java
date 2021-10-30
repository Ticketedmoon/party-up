package com.partyup.publicchat.message.infrastructure.listener;

import com.partyup.publicchat.message.application.domain.model.ChatMessage;
import com.partyup.publicchat.message.application.domain.model.MessageType;
import com.partyup.publicchat.message.application.dto.UserDto;
import com.partyup.publicchat.message.application.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;
    private final MessageService messageService;

    @EventListener
    public void handleWebSocketConnectListener(final SessionConnectedEvent event) {
        log.info("Connection Event: Received a new web socket connection with event {}", event);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(final SessionDisconnectEvent event) {
        log.info("Disconnection Event: Received a new web socket disconnection with event {}", event);
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        final UserDto user = (UserDto) headerAccessor.getSessionAttributes().get("username");
        messageService.removeConnectedUser(user);

        final ChatMessage chatMessage = ChatMessage.builder()
                .type(MessageType.DISCONNECT)
                .content(String.format("User %s has disconnected from the session.", user.getUsername()))
                .sender(user)
                .build();
        messagingTemplate.convertAndSend("/topic/chat/userDisconnected", chatMessage);
    }
}
