package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.ChattingMember;
import walking_beans.walking_beans_backend.service.chattingMember.ChattingMemberServiceImpl;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/chattingmember")
public class ChattingMemberController {

    @Autowired
    private ChattingMemberServiceImpl chattingMemberService;

    @GetMapping
    public ResponseEntity<List<ChattingMember>> getAllChattingMembers(@RequestParam("roomId") long roomId,
                                                                      @RequestParam("userId") long userId) {
        return ResponseEntity.ok(chattingMemberService.getAllChattingMembers(roomId, userId));
    }

    @GetMapping("/roomId")
    public ResponseEntity<Map<Integer, Long>> getUserAndStoreRoomId(@RequestParam("orderId") long orderId,
                                                                       @RequestParam("userId") long userId) {


        return ResponseEntity.ok(chattingMemberService.getUserAndStoreRoomId(orderId, userId));
    }
}
