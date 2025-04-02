package walking_beans.walking_beans_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;


@Component
public class WebSocketHandlerOrder extends TextWebSocketHandler{
    // 연결된 클라이언트 세션들을 저장
    private final List<WebSocketSession> sessions = new ArrayList<>();

    // 클라이언트가 연결될 때 호출
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("새 클라이언트 연결: " + session.getId());
    }

    // 클라이언트가 연결을 끊을 때 호출
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("클라이언트 연결 해제: " + session.getId());
    }

    // 주문 업데이트를 모든 클라이언트에게 전송하는 메서드
    public void sendOrderUpdate(String message) throws Exception {
        System.out.println("전송할 세션 수: " + sessions.size()); // 연결된 클라이언트 수
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
               System.out.println("메시지 전송: " + message + " to " + session.getId());
                session.sendMessage(new TextMessage(message));
            } else{
                System.out.println("세션 닫힘: " + session.getId());
            }
        }
    }


}
