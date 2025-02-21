package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.ChattingRoom;
import walking_beans.walking_beans_backend.service.ChattingRoomService.ChattingRoomServiceImpl;
import walking_beans.walking_beans_backend.service.MessageService.MessageServiceImpl;

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
    @GetMapping
    public ResponseEntity<List<ChattingRoom>> getChattingRooms(@RequestParam("userId") long userId,
                                                               @RequestParam("receiverRelation") int receiverRelation) {
        log.info("=== /api/chattingroom?userId=" + userId + "&receiverRelation=" + receiverRelation);

        return ResponseEntity.ok(chattingRoomService.getAllChattingRoomByReceiverRelation(userId, receiverRelation));
    }

    /**
     * Updating Last Message
     * @param roomId : room Id
     * @param roomLastMessage : Last Message
     * @return
     */
    @PutMapping
    public ResponseEntity<ChattingRoom> updateLastMessageOfChattingRoom(@RequestParam("roomId") long roomId,
                                                                        @RequestParam("roomLastMessage") String roomLastMessage) {
        log.info("=== /api/chattingroom?roomId=" + roomId + "&roomLastMessage=" + roomLastMessage);

        return null;
    }

}
