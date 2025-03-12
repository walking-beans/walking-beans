package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.messageService.MessageServiceImpl;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageServiceImpl messageService;

    /** getAllMessages by roomId
     */
    @GetMapping
    public ResponseEntity<List<Message>> getAllMessages(@RequestParam("roomId") long roomId) {
        List<Message> messages = messageService.getAllMessages(roomId);
        return ResponseEntity.ok(messages);
    }

}
