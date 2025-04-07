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
           log.info("Time difference: {}, ofDays = {}", this.timeDifference, ofDays);
           return;
       }

       if (ofDays > 30) {
           this.timeDifference = String.valueOf((ofDays / 30)) + "달 전";
           log.info("Time difference: {}, ofDays = {}", this.timeDifference, ofDays);
           return;
       }

        if (ofDays > 0) {
            this.timeDifference = String.valueOf(ofDays) + "일 전";
            log.info("Time difference: {}, ofDays = {}", this.timeDifference, ofDays);
            return;
        }

        long ofMinutes = duration.toMinutes();

        if (ofMinutes > 59) {
            this.timeDifference = String.valueOf(ofMinutes / 60) + "시간 전";
            log.info("Time difference: {}, ofMinutes = {}", this.timeDifference, ofMinutes);
            return;
        }

        if (ofMinutes > 0) {
            this.timeDifference = String.valueOf(ofMinutes) + "분 전";
            log.info("Time difference: {}, ofMinutes = {}", this.timeDifference, ofMinutes);
            return;
        }

        this.timeDifference = "방금 전";
        log.info("Time difference: {}, ofDays = {}", this.timeDifference, ofDays);
    }
}
