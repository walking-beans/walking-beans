package walking_beans.walking_beans_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.service.alarmService.AlarmService;

import java.util.List;

@RestController
public class AlarmAPIController {
    /*
    private final AlarmService alarmService;


    public AlarmAPIController(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    @PostMapping("/chat/send")
    public void sendMessage(@RequestBody Alarms alarms) {
        alarmService.sendMessage(alarms);
    }

    @GetMapping("/api/chat/{userId}")
    public List<Alarms> getUserAlarm(@PathVariable("userId") int userId) {
        return alarmService.getUserAlarmList(userId);
    }

    @DeleteMapping("/api/alarm/delete/{userId}")
    public void deleteAllAlarms(@PathVariable("userId") byte userId) {
        alarmService.deleteAllAlarm(userId);
    }

     */
    @Autowired
    private AlarmService alarmService;

    //알림 목록 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<Alarms>> getNotifications(@PathVariable Long userId) {
        List<Alarms> notifications = alarmService.getNotificationsByStoreId(userId);
        return ResponseEntity.ok(notifications);
    }

    // 사장님이 특정 알림을 읽음 처리
    @PutMapping("/read/{alarmId}")
    public ResponseEntity<String> markAsRead(@PathVariable Long alarmId) {
        alarmService.markNotificationAsRead(alarmId);
        return ResponseEntity.ok("알림이 읽음 처리되었습니다.");
    }
}
