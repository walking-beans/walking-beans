package walking_beans.walking_beans_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.alarmService.AlarmService;

@RestController
@RequestMapping("/chat")
public class AlarmAPIController {
    private final AlarmService alarmService;


    public AlarmAPIController(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    @PostMapping("/send")
    public void sendMessage(@RequestBody Message message) {
        alarmService.sendMessage(message);
    }
}
