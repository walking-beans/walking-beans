package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.ChattingRoom;

import java.util.List;

@Mapper
public interface ChattingRoomMapper {

    List<ChattingRoom> getAllChattingRoomByReceiverRelation(long userId, int receiverRelation);

    int updateLastMessageOfChattingRoom(long roomId, String roomLastMessage);
}
