package walking_beans.walking_beans_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.service.alarmService.AlarmNotificationService;
import walking_beans.walking_beans_backend.service.alarmService.AlarmService;

import java.util.List;

@RestController
public class AlarmAPIController {
    @Autowired
    private AlarmService alarmService;

    @Autowired
    private AlarmNotificationService alarmNotificationService;

    // 특정 알림을 읽음 처리
    @PutMapping("/api/read/{alarmId}")
    public ResponseEntity<String> markAsRead(@PathVariable Long alarmId) {
        alarmService.markNotificationAsRead(alarmId);
        return ResponseEntity.ok("알림이 읽음 처리되었습니다.");
    }

    // 전체 알람 읽음 처리
    @PutMapping("/api/allreadalarms/{userId}")
    public void markAllReadAlarms(@PathVariable Long userId) {
        alarmService.markAllNotificationsAsRead(userId);
    }

    // 알림 리스트 가져오기
    @GetMapping("/api/chat/{userId}")
    public List<Alarms> getUserAlarm(@PathVariable("userId") int userId) {
        return alarmService.getUserAlarmList(userId);
    }

    // 읽지 않은 알람 리스트 가져오기
    @GetMapping("/api/noreadalarms/{userId}")
    public List<Alarms> getNotReadAlarms(@PathVariable("userId") long userId) {
        return alarmService.getNotReadAlarms(userId);
    }


    // 알림 리스트 전체 삭제
    @DeleteMapping("/api/alarm/delete/{userId}")
    public void deleteAllAlarms(@PathVariable("userId") byte userId) {
        alarmService.deleteAllAlarm(userId);
    }

    //전체 공지 보내는 api
    @PostMapping("/api/alarm/announcementAlarm")
    public void announcementAlarm(@RequestBody String announcement) {
        alarmNotificationService.sendAdminNotification(Alarms.create(0,1,announcement,4,"testUrl"));
        System.out.println("전체공지발송:"+announcement);
    }
}
