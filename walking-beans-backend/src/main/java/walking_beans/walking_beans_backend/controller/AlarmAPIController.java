package walking_beans.walking_beans_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.service.alarmService.AlarmService;

import java.util.List;

@RestController
public class AlarmAPIController {
    @Autowired
    private AlarmService alarmService;

    // 사장님이 특정 알림을 읽음 처리
    @PutMapping("/read/{alarmId}")
    public ResponseEntity<String> markAsRead(@PathVariable Long alarmId) {
        alarmService.markNotificationAsRead(alarmId);
        return ResponseEntity.ok("알림이 읽음 처리되었습니다.");
    }

    // 알림 리스트 가져오기
    @GetMapping("/api/chat/{userId}")
    public List<Alarms> getUserAlarm(@PathVariable("userId") int userId) {
        return alarmService.getUserAlarmList(userId);
    }

    // 알림 리스트 전체 삭제
    @DeleteMapping("/api/alarm/delete/{userId}")
    public void deleteAllAlarms(@PathVariable("userId") byte userId) {
        alarmService.deleteAllAlarm(userId);
    }
}
