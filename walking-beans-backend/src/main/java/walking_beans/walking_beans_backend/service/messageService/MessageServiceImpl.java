package walking_beans.walking_beans_backend.service.messageService;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ChattingRoomMapper;
import walking_beans.walking_beans_backend.mapper.MessageMapper;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.model.dto.admin.UserMessage;

import java.util.List;

@RequiredArgsConstructor
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
    public Integer insertMessageByRoomId(Message message) {

        // messageRole checking -> 이미지 경로 재설정

        return messageMapper.insertMessageByRoomId(message);
    }

    @Override
    public List<UserMessage> getAllUserMessage(long roomId) {
        return messageMapper.getAllUserMessage(roomId);
    }
}
