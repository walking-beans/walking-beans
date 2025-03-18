package walking_beans.walking_beans_backend.service.alarmService;

import org.springframework.data.repository.query.Param;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.util.List;

public interface AlarmService {
/*
    void sendAlarm(Alarms alarm);

    void sendMessage(Alarms alarms);

    List<Alarms> getUserAlarmList(int userId);

    void deleteAllAlarm(byte userId);
*/
    void sendNotification(Long storeId, String message);
    List<Alarms> getNotificationsByStoreId(Long storeId);
    void markNotificationAsRead(Long notificationId);
}
