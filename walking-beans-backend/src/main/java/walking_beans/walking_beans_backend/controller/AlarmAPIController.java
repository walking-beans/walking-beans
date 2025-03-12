package walking_beans.walking_beans_backend.controller;

import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.alarmService.AlarmService;

import java.util.List;

@RestController
public class AlarmAPIController {
    private final AlarmService alarmService;


    public AlarmAPIController(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    @PostMapping("/chat/send")
    public void sendMessage(@RequestBody Message message) {
        alarmService.sendMessage(message);
    }

    @GetMapping("/api/chat/{userId}")
    public List<Alarms> getUserAlarm(@PathVariable("userId") int userId) {
        return alarmService.getUserAlarmList(userId);
    }
}
