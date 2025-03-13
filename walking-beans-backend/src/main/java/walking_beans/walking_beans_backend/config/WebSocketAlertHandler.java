package walking_beans.walking_beans_backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
public class WebSocketAlertHandler extends TextWebSocketHandler {

    private static final Set<WebSocketSession> sessions = new HashSet<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("New WebSocket connection established: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 클라이언트가 특정 데이터를 요청하면 필요한 데이터를 보내줄 수 있음
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    public void sendAlert(String alertMessage) {
        for (WebSocketSession session : sessions) {
            try {
                session.sendMessage(new TextMessage(alertMessage));
                System.out.println("Sent alert to: " + session.getId());
            } catch (IOException e) {
                System.err.println("Error sending alert: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
