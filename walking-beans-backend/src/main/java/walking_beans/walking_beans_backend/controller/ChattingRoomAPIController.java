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

    @GetMapping("/roomId")
    public ResponseEntity<Long> getRoomIdByOrderId(@RequestParam("orderId") long orderId) {
        log.info("=== /api/chattingroom?orderId=" + orderId);
        return ResponseEntity.ok(chattingRoomService.getRoomIdByOrderId(orderId));
    }

    @GetMapping("/insert")
    public ResponseEntity<Void> createChattingRoomForRider(@RequestParam("riderId") long riderId, @RequestParam("userId") long userId, @RequestParam("ownerId") long ownerId, @RequestParam("orderId") long orderId) {

        chattingRoomService.createChattingRoomForRider(riderId, userId, ownerId, orderId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/userinsert")
    public ResponseEntity<Void> createChattingRoomForUserAndOwner(
            @RequestParam("userId") long userId,
            @RequestParam("orderId") long orderId) {

        chattingRoomService.createChattingRoomForUserAndOwner(userId, orderId);

        return ResponseEntity.ok().build();
    }
}
