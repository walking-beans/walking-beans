package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.util.List;

@Mapper
public interface MessageMapper {

    List<Message> getAllMessages(@Param("roomId") long roomId);

    Integer insertMessageByRoomId(Message message);
}
