package walking_beans.walking_beans_backend.service.alarmService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.config.WebSocketAlertHandler;
import walking_beans.walking_beans_backend.mapper.AlarmMapper;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.ChattingInfoDTO;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;
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
    @Autowired
    private WebSocketAlertHandler webSocketAlertHandler;

    // 알림 저장
    @Override
    public void sendNotification(Alarms alarm) {
        alarmMapper.insertAlarm(alarm);

        alarm.setAlarmId(alarm.getAlarmId());
        log.info("알림 저장 완료" + alarm);
        webSocketAlertHandler.sendAlert(alarm);
    }

    // 읽지 않은 알람 가져오기
    @Override
    public List<Alarms> getNotReadAlarms(long userId) {
        return alarmMapper.getNotReadAlarms(userId);
    }

    //  특정 알림 읽음 처리
    @Override
    public void markNotificationAsRead(Long alarmId) {
        alarmMapper.markNotificationAsRead(alarmId);
        log.info("알림 읽음 처리 완료 - 알림 ID: {}", alarmId);
    }

    @Override
    public void markAllNotificationsAsRead (long userId) {
        alarmMapper.markAllNotificationsAsRead(userId);
    }

    // 채팅 유저들 정보 가져오기
    @Override
    public ChattingInfoDTO getChattingUserInfo(long roomId, long senderId) {
        return alarmMapper.getChattingUserInfo(roomId, senderId);
    }

    //알림용 주문 상태 데이터 가져오기
    @Override
    public OrderStoreDTO getOrderInfoForAlarm(long orderId) {
        return alarmMapper.getOrderInfoForAlarm(orderId);
    }

    // 리뷰용 스토어 아이디로 유저 아이디 가져오기
    @Override
    public OrderStoreDTO getUserIdForReview(long orderId) {
        return alarmMapper.getUserIdForReview(orderId);
    }

    // 스토어 알림용 스토어 주인 유저 아이디 가져오기
    @Override
    public OrderStoreDTO getUserIdForOrderAlarm(String orderNumber) {
        return alarmMapper.getUserIdForOrderAlarm(orderNumber);
    }

    //알람 리스트 가져오기
    @Override
    public List<Alarms> getUserAlarmList(int userId) {
        return alarmMapper.getUserAlarmList(userId);
    }

    // 알람 리스트 전체 삭제하기
    @Override
    public void deleteAllAlarm(byte userId) {
        alarmMapper.deleteAllAlarm(userId);
    }
}
