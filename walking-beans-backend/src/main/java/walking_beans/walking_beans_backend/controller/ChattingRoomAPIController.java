package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.ChattingRoom;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.chattingRoomService.ChattingRoomServiceImpl;
import walking_beans.walking_beans_backend.service.messageService.MessageService;
import walking_beans.walking_beans_backend.service.messageService.MessageServiceImpl;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/chattingroom")
public class ChattingRoomAPIController {

    @Autowired
    private ChattingRoomServiceImpl chattingRoomService;

    @Autowired
    private MessageServiceImpl messageService;

    /**
     * List of Chatting Room by the receiver's role
     * @param userId : user id
     * @param receiverRelation : receiver's role
     * @return ResponseEntity.ok(List<ChattingRoom>)
     */
    @MessageMapping("/lists")
    public ResponseEntity<List<ChattingRoom>> getChattingRooms(@RequestParam("userId") long userId,
                                                               @RequestParam("receiverRelation") int receiverRelation) {
        log.info("=== /api/chattingroom?userId=" + userId + "&receiverRelation=" + receiverRelation);

        return ResponseEntity.ok(chattingRoomService.getAllChattingRoomByReceiverRelation(userId, receiverRelation));
    }

    /**
     * Updating Last Message
     * @return
     */
    @MessageMapping()// Put : 1개만 적용 && Post : 여러 개 적용시
    public ResponseEntity<Integer> updateLastMessageOfChattingRoom(@RequestParam("roomId") long roomId,
                                                                        @RequestParam("userId") long userId,
                                                                        @RequestParam("messageRole") int messageRole,
                                                                        @RequestParam("messageContent") String messageContent) {
        log.info("=== /api/chattingroom?roomId=" + roomId + "&roomLast  Message=" + messageContent);
        int messageInsert = messageService.insertMessageByRoomId(roomId, userId, messageRole, messageContent);
        int chattingInsert = chattingRoomService.updateLastMessageOfChattingRoom(roomId, messageContent);
        if (messageInsert != 0 && chattingInsert != 0) {
            return ResponseEntity.ok(1);
        }
        return ResponseEntity.badRequest().build();
    }

}
