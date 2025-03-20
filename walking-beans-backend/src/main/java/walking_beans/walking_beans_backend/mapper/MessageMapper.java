package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.model.dto.admin.UserMessage;

import java.util.List;

@Mapper
public interface MessageMapper {

    List<Message> getAllMessages(@Param("roomId") long roomId);

    Integer insertMessageByRoomId(Message message);

    List<UserMessage> getAllUserMessage(@Param("roomId") long roomId);
}
