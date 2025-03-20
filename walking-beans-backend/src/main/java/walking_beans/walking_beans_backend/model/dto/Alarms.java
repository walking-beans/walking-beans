package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.sql.Timestamp;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Alarms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long alarmId;

    private long userId;

    //1 = 알림,2 = 채팅
    private int alarmRole;

    private long alarmSenderId;

    private String alarmContent;

    // 읽지 않음 = false, 읽음 = true
    private boolean alarmStatus;

    private Timestamp alarmCreateDate;

    private String alarmUrl;

    // 호출시 편의성을 위해 알람 팩토리 메서드 추가 (테스트용)
    public static Alarms create(long userId, int alarmRole, String alarmContent, long senderId, String alarmUrl) {
        Alarms alarms = new Alarms();
        alarms.setUserId(userId);
        alarms.setAlarmRole(alarmRole);
        alarms.setAlarmContent(alarmContent);
        alarms.setAlarmSenderId(senderId);
        alarms.setAlarmStatus(false); // 기본값: 읽지 않음
        alarms.setAlarmCreateDate(new Timestamp(System.currentTimeMillis())); // 생성 시간
        alarms.setAlarmUrl(alarmUrl);
        return alarms;
    }
}
