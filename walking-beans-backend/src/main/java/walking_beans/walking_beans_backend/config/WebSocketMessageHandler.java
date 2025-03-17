/*
package walking_beans.walking_beans_backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.chattingRoomService.ChattingRoomServiceImpl;
import walking_beans.walking_beans_backend.service.messageService.MessageService;

import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class WebSocketMessageHandler extends TextWebSocketHandler {

    private static final ConcurrentHashMap<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();
    private final MessageService messageService;
    private final ChattingRoomServiceImpl chattingRoomService;

    // private final ObjectMapper objectMapper = new ObjectMapper();
    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    @Override // 클라이언트가 연결되면 세션을 저장 (닉네임을 이후 저장)
    public void afterConnectionEstablished(WebSocketSession session) {

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws Exception {
        Message message = objectMapper.readValue(textMessage.getPayload(), Message.class);

        // 닉네임을 처음 보낼 경우 세션과 연결
        if (!userSessions.containsKey(String.valueOf(message.getUserId()))) {
            userSessions.put(String.valueOf(message.getUserId()), session);
        }

        // 메시지 DB 저장
        messageService.insertMessageByRoomId(message);
        // chattingroom lastMessage update
        if (message.getMessageRole() != 2) {
            chattingRoomService.updateLastMessageOfChattingRoom(message.getRoomId(), message.getMessageContent());
        }

        // 수신자에게 메시지 전송
        if (message.getUserId() != 0 && userSessions.containsKey(String.valueOf(message.getUserId()))) {
            WebSocketSession receiverSession = userSessions.get(String.valueOf(message.getUserId()));
            receiverSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }



    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        // 세션과 연결된 닉네임을 찾아서 제거
        userSessions.entrySet().removeIf(entry -> entry.getValue().equals(session));
    }
}
*/
