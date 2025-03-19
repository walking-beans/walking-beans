package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;
import walking_beans.walking_beans_backend.model.dto.Alarms;

import java.util.List;

@Mapper
public interface AlarmMapper {

    void insertAlarm(Alarms alarm);

    List<Alarms> getUserAlarmList(int userId);

    void deleteAllAlarm(byte userId);

    //  알림 저장
    //void insertAlarm(@Param("userId") Long userId, @Param("alarmContent") String alarmContent);

    //  특정 가게의 알림 조회
    //List<Alarms> getNotificationsByStoreId(@Param("userId") Long userId);

    // 특정 알림을 읽음 처리
    void markNotificationAsRead(@Param("alarmId") Long alarmId);
}
