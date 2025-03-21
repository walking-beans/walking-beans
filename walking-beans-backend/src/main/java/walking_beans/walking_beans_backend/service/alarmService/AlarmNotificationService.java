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
}
