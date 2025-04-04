package walking_beans.walking_beans_backend.model.dto;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;

@Slf4j
@Data
public class ChattingInfoDTO {
    // 채팅방 정보
    private long roomId;
    private String lastMessage;
    private LocalDateTime modifiedDate;
    private String timeDifference;

    // 주문 정보
    private long orderId;

    // 보낸 사람 정보
    private long senderId;
    private String senderName;

    // 받는 사람 정보
    private long receiverId;
    private String receiverName;
    private int receiverRelation;
    private String receiverPictureUrl;

    public void setTimeDifference() {
       Duration duration = Duration.between(modifiedDate, LocalDateTime.now());
       long ofDays = duration.toDays();
       log.info("Time difference: " + duration.toMinutes() + " minutes");
       if (ofDays > 364) {
           this.timeDifference = String.valueOf(ofDays / 365) + "년 전";
           return;
       }

       if (ofDays > 30) {
           this.timeDifference = String.valueOf((ofDays / 30)) + "달 전";
       }
    }
}
