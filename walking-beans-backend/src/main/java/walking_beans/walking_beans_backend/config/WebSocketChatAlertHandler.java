package walking_beans.walking_beans_backend.config;



import com.fasterxml.jackson.databind.ObjectMapper;


import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.alarmService.AlarmService;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class WebSocketChatAlertHandler extends TextWebSocketHandler {

    private static final Set<WebSocketSession> sessions = new HashSet<>();
    private final AlarmService alarmService;
    private final WebSocketAlertHandler alertHandler;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public WebSocketChatAlertHandler(AlarmService alarmService, WebSocketAlertHandler alertHandler) {
        this.alarmService = alarmService;
        this.alertHandler = alertHandler;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        session.getAttributes().put("userId", 1L);
        sessions.add(session);
        System.out.println("WebSocket connection established: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        // JSON 데이터를 Alarms 객체로 변환
        Alarms receivedAlarm = objectMapper.readValue(message.getPayload(), Alarms.class);

        // 메시지 저장 (임시 주석)
        //alarmService.sendMessage(receivedAlarm);

        // 모든 세션에 메시지 전달
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen()) {
                //webSocketSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(receivedAlarm)));
                String jsonMessage = objectMapper.writeValueAsString(receivedAlarm);
                webSocketSession.sendMessage(new TextMessage(jsonMessage));
                System.out.println("Message sent to session: " + webSocketSession.getId());
                System.out.println(jsonMessage);
            }
        }
        // 알림 전송
        //alertHandler.sendAlert("📩 새로운 채팅이 도착했습니다: " + receivedAlarm);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        System.out.println("WebSocket connection closed: " + session.getId());
    }

}
