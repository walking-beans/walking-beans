package walking_beans.walking_beans_backend.service.alarmService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.model.dto.Alarms;

@Slf4j
@Service
public class AlarmNotificationService {
    @Autowired
    private  SimpMessagingTemplate messagingTemplate;
    @Autowired
    private AlarmService alarmService;

    public void sendOrderNotification(Alarms alarm) {
        String destination = "/topic/alarms/" + alarm.getUserId();
        log.info("WebSocket 메시지 전송: {} -> {}", destination, alarm);

        messagingTemplate.convertAndSend(destination, alarm);

        alarmService.sendNotification(alarm);
    }

    // 전체 알림 전송
    public void sendAdminNotification(Alarms adminAlarm) {
        String destination = "/topic/alarms/admin"; // 관리자 알림을 전체 사용자에게 전송
        log.info("WebSocket 관리자 알림 전송: {} -> {}", destination, adminAlarm);

        // 관리자 알림을 전송
        messagingTemplate.convertAndSend(destination, adminAlarm);

        alarmService.sendNotification(adminAlarm);
    }
}
