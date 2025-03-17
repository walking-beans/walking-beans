package walking_beans.walking_beans_backend.model.dto.admin;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserChattingRoom {
    private long roomId;

    private long orderId;

    private String messageContent;

    private String messageTime;

    private String userName;

    private String userPictureUrl;
}
