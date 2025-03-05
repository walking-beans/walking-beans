package walking_beans.walking_beans_backend.service.messageService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import walking_beans.walking_beans_backend.mapper.ChattingRoomMapper;
import walking_beans.walking_beans_backend.mapper.MessageMapper;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private ChattingRoomMapper chattingRoomMapper;

    @Override
    public List<Message> getAllMessages(long roomId) {
        return messageMapper.getAllMessages(roomId);
    }

    @Override
    public Integer insertMessageByRoomId(@RequestParam("roomId") long roomId,
                                         @RequestParam("userId") long userId,
                                         @RequestParam("messageRole") int messageRole,
                                         @RequestParam("messageContent") String messageContent) {

        // messageRole checking -> 이미지 경로 재설정

        // chattingroom update
        chattingRoomMapper.updateLastMessageOfChattingRoom(roomId, messageContent);

        return messageMapper.insertMessageByRoomId(roomId, userId, messageRole, messageContent);
    }
}
