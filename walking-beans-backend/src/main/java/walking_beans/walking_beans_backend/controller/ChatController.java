package walking_beans.walking_beans_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.model.dto.admin.UserChattingRoom;
import walking_beans.walking_beans_backend.model.dto.admin.UserMessage;
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
    @SendTo("/sub/chatroom")
    public ResponseEntity<Void> receiveMessage(@RequestBody Message message) {
        log.info("================ message : {} ===================", message.toString());
        // 메시지를 해당 채팅방 구독자들에게 전송
        messagingTemplate.convertAndSend("/sub/chatroom/" + message.getRoomId(), message);
        messageService.insertMessageByRoomId(message);
        return ResponseEntity.ok().build();
    }

    @MessageMapping("/chatting")
    @SendTo("/sub/chattingroom")
    public ResponseEntity<Void> receiveChattingMessage(@RequestBody Message message) {
        log.info("================ receiveChattingMessage : {} ===================", message.toString());
        // 메시지를 해당 채팅방 구독자들에게 전송
        messagingTemplate.convertAndSend("/sub/chattingroom" + message.getRoomId(), message);
        chattingRoomService.updateLastMessageOfChattingRoom(message.getRoomId(), message.getMessageContent());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/chattingmessage")
    public ResponseEntity<List<UserMessage>> getAllUserMessage(@RequestParam("roomId") long roomId) {
        log.info("getAllUserMessage roomId={}", roomId);
        List<UserMessage> messages = messageService.getAllUserMessage(roomId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/api/userchattingroom")
    public ResponseEntity<List<UserChattingRoom>> getUserChattingRoomByUserId(@RequestParam("userId") long userId,
                                                                              @RequestParam("receiverRelation") int receiverRelation) {
        log.info("getUserChattingRoomByUserId userId={}, userRole={}", userId, receiverRelation);
        return ResponseEntity.ok(chattingRoomService.getUserChattingRoomByUserId(userId, receiverRelation));
    }
}
