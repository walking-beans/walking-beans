package walking_beans.walking_beans_backend.service.alarmService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.config.WebSocketAlertHandler;
import walking_beans.walking_beans_backend.mapper.AlarmMapper;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.messageService.MessageService;

import java.sql.Timestamp;
import java.util.List;
/*
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
 */
@Slf4j
@Service
public class AlarmServiceImpl implements AlarmService {

    @Autowired
    private  AlarmMapper alarmMapper;

    // 알림 저장 (WebSocket으로 주문이 오면 이 함수 실행)
    @Override
    public void sendNotification(Alarms alarm) {
        alarmMapper.insertAlarm(alarm);
        log.info("알림 저장 완료" + alarm);
    }

    // 특정 가게의 알림 목록 조회
    /*@Override
    public List<Alarms> getNotificationsByStoreId(Long userId) {
        return alarmMapper.getNotificationsByStoreId(userId);
    }*/

    //  특정 알림 읽음 처리
    @Override
    public void markNotificationAsRead(Long alarmId) {
        alarmMapper.markNotificationAsRead(alarmId);
        log.info("알림 읽음 처리 완료 - 알림 ID: {}", alarmId);
    }

    @Override
    public List<Alarms> getUserAlarmList(int userId) {
        return alarmMapper.getUserAlarmList(userId);
    }

    @Override
    public void deleteAllAlarm(byte userId) {
        alarmMapper.deleteAllAlarm(userId);
    }
}
