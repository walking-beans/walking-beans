package walking_beans.walking_beans_backend.service.alarmService;

import org.springframework.data.repository.query.Param;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.ChattingInfoDTO;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;

import java.util.List;

public interface AlarmService {
    // 알림 리스트 가져오기
    List<Alarms> getUserAlarmList(int userId);

    //알람 리스트 전체 삭제하기
    void deleteAllAlarm(byte userId);

    // 알람 전송하기
    void sendNotification(Alarms alarm);

    // 읽지 않은 알람 가져오기
    List<Alarms>getNotReadAlarms (long userId);

    // 알림 읽음 표시
    void markNotificationAsRead(Long notificationId);

    // 전체 알람 읽음 처리
    void markAllNotificationsAsRead(long userId);

    // 채팅 유저들 정보 가져오기
    ChattingInfoDTO getChattingUserInfo (long roomId, long senderId);

    //알림용 주문 상태 데이터 가져오기
    OrderStoreDTO getOrderInfoForAlarm (long orderId);

    // 리뷰용 유저 아이디 가져오기
    OrderStoreDTO getUserIdForReview (long orderId);

    // 스토어 아이디로 스토어 주인 유저 아이디 가져오기
    OrderStoreDTO getUserIdForOrderAlarm(String orderNumber);
}
