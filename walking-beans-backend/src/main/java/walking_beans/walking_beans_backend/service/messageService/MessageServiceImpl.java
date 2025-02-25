package walking_beans.walking_beans_backend.service.messageService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import walking_beans.walking_beans_backend.mapper.MessageMapper;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;

    @Override
    public List<Message> getAllMessages(long roomId) {
        return messageMapper.getAllMessages(roomId);
    }

    @Override
    public Integer insertMessageByRoomId(@RequestParam("roomId") long roomId,
                                         @RequestParam("userId") long userId,
                                         @RequestParam("messageRole") int messageRole,
                                         @RequestParam("messageContent") String messageContent) {
        Message message = new Message();
        message.setRoomId(roomId);
        message.setUserId(userId);
        message.setMessageRole(messageRole);
        message.setMessageContent(messageContent);
        return messageMapper.insertMessageByRoomId(message);
    }
}
