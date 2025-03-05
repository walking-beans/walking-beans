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
}
