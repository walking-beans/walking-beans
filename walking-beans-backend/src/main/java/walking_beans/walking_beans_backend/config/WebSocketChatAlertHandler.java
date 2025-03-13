package walking_beans.walking_beans_backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.service.alarmService.AlarmService;
import walking_beans.walking_beans_backend.service.alarmService.AlarmServiceImpl;

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
        sessions.add(session);
        System.out.println("WebSocket connection established: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        // JSON 데이터를 Alarms 객체로 변환
        Alarms receivedAlarm = objectMapper.readValue(message.getPayload(), Alarms.class);

        // 메시지 저장
        alarmService.sendMessage(receivedAlarm);

        // 받아온 userId로 알림을 보냄
        long targetUserId = receivedAlarm.getUserId(); // 받은 메시지에서 userId를 추출
        sendAlertToUser(targetUserId, receivedAlarm);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        System.out.println("WebSocket connection closed: " + session.getId());
    }

    // 특정 userId에게만 알림을 전송하는 메서드
    public void sendAlertToUser(long targetUserId, Alarms receivedAlarm) {
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen()) {
                // 세션에서 userId 추출 (세션의 속성으로 저장된 userId가 있어야 함)
                Long sessionUserId = (Long) webSocketSession.getAttributes().get("userId");

                // userId가 일치하는 세션에만 메시지 전송
                if (sessionUserId != null && sessionUserId.equals(targetUserId)) {
                    try {
                        webSocketSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(receivedAlarm)));
                        System.out.println("Message sent to session: " + webSocketSession.getId() + " for user: " + targetUserId);
                    } catch (IOException e) {
                        System.err.println("Error sending alert: " + e.getMessage());
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
