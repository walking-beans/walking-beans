package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;
import walking_beans.walking_beans_backend.model.dto.Message;

import java.util.List;

@Mapper
public interface MessageMapper {

    List<Message> getAllMessages(@Param("roomId") long roomId);

    Integer insertMessageByRoomId(@Param("roomId") long roomId,
                                  @Param("userId") long userId,
                                  @Param("messageRole") int messageRole,
                                  @Param("messageContent") String messageContent);
}
