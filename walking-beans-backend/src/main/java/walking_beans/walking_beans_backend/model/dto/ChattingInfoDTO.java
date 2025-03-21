package walking_beans.walking_beans_backend.model.dto;

import lombok.Data;

@Data
public class ChattingInfoDTO {
    private long roomId;

    private String lastMessage;

    private long orderId;

    private long senderId;

    private String senderName;

    private long receiverId;

    private String receiverName;
}
