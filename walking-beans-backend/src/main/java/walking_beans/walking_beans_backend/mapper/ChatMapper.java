package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.ChatMessage;

import java.util.List;

@Mapper
public interface ChatMapper {
    List<ChatMessage> getMessages();
    void saveMessage(ChatMessage message);
}