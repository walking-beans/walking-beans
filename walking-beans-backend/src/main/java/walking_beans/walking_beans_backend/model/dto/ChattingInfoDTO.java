package walking_beans.walking_beans_backend.model.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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
       /* this.orderCreatedDay = orderCreateDate.getMonthValue() + "/" + orderCreateDate.getDayOfMonth();
        this.orderCreatedTime = (orderCreateDate.getHour() < 10 ? "0" + orderCreateDate.getHour() : orderCreateDate.getHour()) + ":" + (orderCreateDate.getMinute() < 10 ? "0" + orderCreateDate.getMinute() : orderCreateDate.getMinute());
        this.orderDeliveredDay = orderModifiedDate.getMonthValue() + "/" + orderModifiedDate.getDayOfMonth();
        this.orderDeliveredTime = (orderModifiedDate.getHour() < 10 ? "0" + orderModifiedDate.getHour() : orderModifiedDate.getHour())  + ":" + (orderModifiedDate.getMinute() < 10 ? "0" + orderModifiedDate.getMinute() : orderModifiedDate.getMinute());
        if (orderCreatedDay.equals(orderDeliveredDay)) {
            this.orderDeliveredDay = null;
        }*/

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.getYear() < modifiedDate.getYear()) {
            this.timeDifference = modifiedDate.minusYears(currentDateTime.getYear()).getYear() + "년 전";
            return;
        }

        if (currentDateTime.getMonthValue() < modifiedDate.getMonthValue()) {
            this.timeDifference = modifiedDate.minusMonths(currentDateTime.getMonthValue()).getMonthValue() + "달 전";
            return;
        }

        if (currentDateTime.getDayOfMonth() < modifiedDate.getDayOfMonth()) {
            this.timeDifference = modifiedDate.minusDays(currentDateTime.getDayOfMonth()).getDayOfMonth() + "일 전";
            return;
        }

        if (currentDateTime.getHour() < modifiedDate.getHour()) {
            this.timeDifference = modifiedDate.minusHours(currentDateTime.getHour()).getHour() + "시간 전";
            return;
        }

        if (currentDateTime.getMinute() < modifiedDate.getMinute()) {
            this.timeDifference = modifiedDate.minusMinutes(currentDateTime.getMinute()).getMinute() + "분 전";
            return;
        }

        this.timeDifference = "방금 전";
    }
}
