package walking_beans.walking_beans_backend.model.vo.admin;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserMessage {
    private long messageId;

    private long roomId;

    private long userId;

    private String messageContent;

    private int messageRole;

    private String messageTime;

    private String userName;

    public void timeChanged() {
        LocalDateTime now = LocalDateTime.now();
        log.info("Time changed from {} to {}", now, this.messageTime);
    }
}
