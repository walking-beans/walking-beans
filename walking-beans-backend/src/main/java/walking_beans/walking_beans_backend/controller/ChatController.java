package walking_beans.walking_beans_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.model.vo.admin.UserMessage;
import walking_beans.walking_beans_backend.service.chattingRoomService.ChattingRoomServiceImpl;
import walking_beans.walking_beans_backend.service.messageService.MessageServiceImpl;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {
    private final MessageServiceImpl messageService;
    private final ChattingRoomServiceImpl chattingRoomService;

    private final SimpMessageSendingOperations messagingTemplate;

    @GetMapping("/api/chatting")
    public ResponseEntity<List<Message>> getAllMessages(@RequestParam("roomId") long roomId) {
        List<Message> messages = messageService.getAllMessages(roomId);
        return ResponseEntity.ok(messages);
    }

    //메시지 송신 및 수신, /pub가 생략된 모습. 클라이언트 단에선 /pub/message로 요청
    @MessageMapping("/message")
    public ResponseEntity<Void> receiveMessage(@RequestBody Message message) {
        // 메시지를 해당 채팅방 구독자들에게 전송
        messagingTemplate.convertAndSend("/sub/chatroom/1", message);
        chattingRoomService.updateLastMessageOfChattingRoom(message.getRoomId(), message.getMessageContent());
        messageService.insertMessageByRoomId(message);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/chattingmessage")
    public ResponseEntity<List<UserMessage>> getAllUserMessage(@RequestParam("roomId") long roomId) {
        log.info("getAllUserMessage roomId={}", roomId);
        List<UserMessage> messages = messageService.getAllUserMessage(roomId);
        return ResponseEntity.ok(messages);
    }
}
