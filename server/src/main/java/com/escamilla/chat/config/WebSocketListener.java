package com.escamilla.chat.config;


import com.escamilla.chat.model.Message;
import com.escamilla.chat.model.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;

public class WebSocketListener {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketListener.class);

    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent e) {
        logger.info("New connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent e) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(e.getMessage());
        String nickName = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("nickName");
        if (nickName != null) {
            logger.info("User {} disconnected", nickName);
            Message message = new Message();
            message.setType(MessageType.QUITE);
            message.setAuthor(nickName);

            messagingTemplate.convertAndSend("topic/public", message);
        }
    }
}
