package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.ChattingInfoDTO;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;

import java.util.List;

@Mapper
public interface AlarmMapper {

    // 알림 저장
    void insertAlarm(Alarms alarm);

    // 알림 리스트 가져오기
    List<Alarms> getUserAlarmList(int userId);

    // 알림 전체 삭제
    void deleteAllAlarm(byte userId);

    // 읽지 않은 알람 가져오기
    List<Alarms>getNotReadAlarms (long userId);

    // 특정 알림을 읽음 처리
    void markNotificationAsRead(@Param("alarmId") Long alarmId);

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
