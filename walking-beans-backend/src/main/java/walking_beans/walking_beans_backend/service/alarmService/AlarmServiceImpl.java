package walking_beans.walking_beans_backend.service.alarmService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.AlarmMapper;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {



    @Autowired
    private AlarmMapper alarmMapper;

    @Override
    public void sendMessage(Message message) {

        // 채팅방의 마지막 메시지 업데이트
        alarmMapper.updateLastMessage(message.getRoomId(), message.getMessageContent());

        // 채팅 알람 생성
        Alarms alarm = new Alarms();
        alarm.setUserId(message.getUserId()); // 메시지를 보낸 사용자 ID
        alarm.setAlarmContent(message.getMessageContent());
        alarm.setAlarmStatus(false);
        alarm.setAlarmSenderId(message.getUserId()); // 보낸 사람 ID
        alarm.setAlarmRole(2);
        alarm.setAlarmCreateDate(new Timestamp(System.currentTimeMillis()));

        alarmMapper.insertAlarm(alarm);


    }

    @Override
    public List<Alarms> getUserAlarmList(int userId) {
        return alarmMapper.getUserAlarmList(userId);
    }

    @Override
    public void sendAlarm(Alarms alarm) {
        alarmMapper.insertAlarm(alarm);
    }
}
