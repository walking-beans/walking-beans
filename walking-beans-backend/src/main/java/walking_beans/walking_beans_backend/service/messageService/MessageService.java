package walking_beans.walking_beans_backend.service.messageService;

import org.springframework.web.bind.annotation.RequestParam;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.util.List;

public interface MessageService {
    List<Message> getAllMessages(long roomId);

    Integer insertMessageByRoomId(@RequestParam("roomId") long roomId,
                                  @RequestParam("userId") long userId,
                                  @RequestParam("messageRole") int messageRole,
                                  @RequestParam("messageContent") String messageContent);
}
