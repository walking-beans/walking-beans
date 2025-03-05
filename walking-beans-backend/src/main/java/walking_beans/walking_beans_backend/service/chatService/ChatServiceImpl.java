package walking_beans.walking_beans_backend.service.chatService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ChatMapper;
import walking_beans.walking_beans_backend.model.dto.ChatMessage;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    @Autowired
    private ChatMapper chatMapper;

    @Override
    public List<ChatMessage> getMessages() {
        return chatMapper.getMessages();
    }

    @Override
    public void saveMessage(ChatMessage message) {
        chatMapper.saveMessage(message);
    }
}