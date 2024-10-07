package com.escamilla.chat.controller;

import com.escamilla.chat.model.Message;
import com.escamilla.chat.model.MessageType;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Controller
public class ChatController {
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message) {
        return message;
    }

    @MessageMapping("/chat.join")
    @SendTo("/topic/public")
    public Message addUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        if (Objects.isNull(message.getAuthor()) || message.getAuthor().trim().isEmpty()) {
            return new Message(MessageType.SERVER, "Nickname cannot be empty", "ERROR_400");
        }
        headerAccessor.getSessionAttributes().put("nickname", message.getAuthor());
        return message;
    }

    @MessageExceptionHandler
    @SendTo("/topic/public")
    public Message handleException(Exception exception) {
        return new Message(MessageType.SERVER, "Internal Server Error: " + exception.getMessage(), "ERROR_500");
    }
}
