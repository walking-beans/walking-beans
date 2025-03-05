package walking_beans.walking_beans_backend.model.vo.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import walking_beans.walking_beans_backend.model.dto.ChatMessage;
import walking_beans.walking_beans_backend.service.chatService.ChatService;

import java.util.concurrent.ConcurrentHashMap;


@Component
@RequiredArgsConstructor
public class WebSocketChatHandler extends TextWebSocketHandler {

    private static final ConcurrentHashMap<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();
    private final ChatService chatService;

    // private final ObjectMapper objectMapper = new ObjectMapper();
    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    @Override // 클라이언트가 연결되면 세션을 저장 (닉네임을 이후 저장)
    public void afterConnectionEstablished(WebSocketSession session) {

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ChatMessage chatMessage = objectMapper.readValue(message.getPayload(), ChatMessage.class);

        // 닉네임을 처음 보낼 경우 세션과 연결
        if (!userSessions.containsKey(chatMessage.getSender())) {
            userSessions.put(chatMessage.getSender(), session);
        }

        // 메시지 DB 저장
        chatService.saveMessage(chatMessage);

        // 수신자에게 메시지 전송
        if (chatMessage.getReceiver() != null && userSessions.containsKey(chatMessage.getReceiver())) {
            WebSocketSession receiverSession = userSessions.get(chatMessage.getReceiver());
            receiverSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessage)));
        } else {
            // 수신자가 없으면 전체 전송 (그룹 채팅처럼)
            for (WebSocketSession s : userSessions.values()) {
                s.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        // 세션과 연결된 닉네임을 찾아서 제거
        userSessions.entrySet().removeIf(entry -> entry.getValue().equals(session));
    }
}