package walking_beans.walking_beans_backend.service.alarmService;

import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.util.List;

public interface AlarmService {

    void sendAlarm(Alarms alarm);

    void sendMessage(Alarms alarms);

    List<Alarms> getUserAlarmList(int userId);

    void deleteAllAlarm(byte userId);
}
