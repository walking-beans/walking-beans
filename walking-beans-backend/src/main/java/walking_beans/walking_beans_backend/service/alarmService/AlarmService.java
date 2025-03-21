package walking_beans.walking_beans_backend.service.alarmService;

import org.springframework.data.repository.query.Param;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.ChattingInfoDTO;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.util.List;

public interface AlarmService {
    // 알림 리스트 가져오기
    List<Alarms> getUserAlarmList(int userId);

    //알람 리스트 전체 삭제하기
    void deleteAllAlarm(byte userId);

    // 알람 전송하기
    void sendNotification(Alarms alarm);

    // 알림 읽음 표시
    void markNotificationAsRead(Long notificationId);

    // 채팅 유저들 정보 가져오기
    ChattingInfoDTO getChattingUserInfo (long roomId, long senderId);
}
