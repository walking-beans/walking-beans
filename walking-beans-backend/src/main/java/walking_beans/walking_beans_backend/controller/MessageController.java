package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.service.messageService.MessageServiceImpl;

@Slf4j
@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageServiceImpl messageService;



}
