package walking_beans.walking_beans_backend.service.alarmService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.config.WebSocketAlertHandler;
import walking_beans.walking_beans_backend.mapper.AlarmMapper;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.messageService.MessageService;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

    @Autowired
    private WebSocketAlertHandler webSocketAlertHandler;

    @Autowired
    private AlarmMapper alarmMapper;

    @Override
    public void sendMessage(Alarms alarms) {

        // 채팅 알람 생성
        Alarms alarm = new Alarms();
        alarm.setUserId(alarms.getUserId()); // 메시지를 보낸 사용자 ID
        alarm.setAlarmContent(alarms.getAlarmContent());
        alarm.setAlarmStatus(false);
        alarm.setAlarmSenderId(alarms.getAlarmSenderId()); // 보낸 사람 ID
        alarm.setAlarmRole(alarms.getAlarmRole());
        alarm.setAlarmCreateDate(new Timestamp(System.currentTimeMillis()));

        alarmMapper.insertAlarm(alarm);

        // 웹소켓 알림 전송
        webSocketAlertHandler.sendAlert(alarm);
    }

    @Override
    public List<Alarms> getUserAlarmList(int userId) {
        return alarmMapper.getUserAlarmList(userId);
    }

    @Override
    public void deleteAllAlarm(byte userId) {
        alarmMapper.deleteAllAlarm(userId);
    }

    @Override
    public void sendAlarm(Alarms alarm) {
        alarmMapper.insertAlarm(alarm);
    }
}
