package walking_beans.walking_beans_backend.service.chatService;

import walking_beans.walking_beans_backend.model.dto.ChatMessage;

import java.util.List;

public interface ChatService {
    List<ChatMessage> getMessages();
    void saveMessage(ChatMessage message);
}