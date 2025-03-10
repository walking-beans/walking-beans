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
public class Message {

    public enum MessageType {
        TALK, JOIN, IMG
    }

    private MessageType type;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long messageId;

    private long roomId;

    private long userId;

    private String messageContent;

    private String messageTime;

}
