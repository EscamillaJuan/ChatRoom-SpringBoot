package com.escamilla.chat.config;


import com.escamilla.chat.model.Message;
import com.escamilla.chat.model.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;

@Component
public class WebSocketListener {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent e) {
        System.out.println("Connection successfully");
        logger.info("New connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent e) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(e.getMessage());
        String nickname = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("nickname");
        if (nickname != null) {
            logger.info("User {} disconnected", nickname);
            Message message = new Message();
            message.setType(MessageType.QUITE);
            message.setAuthor(nickname);

            messagingTemplate.convertAndSend("/topic/public", message);
        }
    }
}
