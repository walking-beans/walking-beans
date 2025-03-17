package walking_beans.walking_beans_backend.service.messageService;

import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.model.dto.admin.UserMessage;

import java.util.List;

public interface MessageService {
    List<Message> getAllMessages(long roomId);

    Integer insertMessageByRoomId(Message message);

    List<UserMessage> getAllUserMessage(long roomId);
}
