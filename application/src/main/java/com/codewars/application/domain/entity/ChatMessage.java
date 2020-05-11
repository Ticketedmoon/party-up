package com.codewars.application.domain.entity;

import com.codewars.application.domain.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class ChatMessage {

    private MessageType type;
    private String content;
    private String sender;
    private String time;

}
