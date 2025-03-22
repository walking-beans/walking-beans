package walking_beans.walking_beans_backend.model.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChattingInfoDTO {
    // 채팅방 정보
    private long roomId;
    private String lastMessage;
    private Timestamp modifiedDate;

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

}
