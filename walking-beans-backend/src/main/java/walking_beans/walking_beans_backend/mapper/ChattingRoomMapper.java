package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.ChattingRoom;
import walking_beans.walking_beans_backend.model.dto.admin.UserChattingRoom;

import java.util.List;

@Mapper
public interface ChattingRoomMapper {

    List<ChattingRoom> getAllChattingRoomByReceiverRelation(long userId, int receiverRelation);

    int updateLastMessageOfChattingRoom(long roomId, String lastMessage);

    List<UserChattingRoom> getUserChattingRoomByUserId(@Param("userId") long userId, @Param("receiverRelation") int receiverRelation);

    long getRoomIdByOrderId(@Param("orderId") long orderId);

    int insertChattingroomByOrderId(@Param("orderId") long orderId);
}
