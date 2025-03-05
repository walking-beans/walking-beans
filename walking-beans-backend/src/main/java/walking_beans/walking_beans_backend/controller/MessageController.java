package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
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

    @PostMapping("/add")
    public void message(@RequestParam("roomId") long roomId,
                        @RequestParam("userId") long userId,
                        @RequestParam("messageRole") int messageRole,
                        @RequestParam("messageContent") String messageContent) {
        log.info("====== Message {} {} {} {} ======",roomId,userId,messageRole,messageContent);
        messageService.insertMessageByRoomId(roomId, userId, messageRole, messageContent);

    }
}
