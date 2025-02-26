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

    private String alarmContent;

    private boolean alarmStatus;

    private Timestamp alarmCreateDate;

    private Timestamp alarmSenderId;
}
