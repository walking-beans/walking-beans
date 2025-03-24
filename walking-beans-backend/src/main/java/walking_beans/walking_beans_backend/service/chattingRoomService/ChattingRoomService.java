package walking_beans.walking_beans_backend.service.chattingRoomService;

import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.ChattingRoom;
import walking_beans.walking_beans_backend.model.dto.admin.UserChattingRoom;

import java.util.List;

public interface ChattingRoomService {

    List<ChattingRoom> getAllChattingRoomByReceiverRelation(long userId, int receiverRelation);

    int updateLastMessageOfChattingRoom(long roomId, String lastMessage);

    List<UserChattingRoom> getUserChattingRoomByUserId(long userId, int receiverRelation);

    long getRoomIdByOrderId(long orderId);

    int insertChattingroomByOrderId(long orderId);

    void createChattingRoomForUserAndOwner(long userId, long orderId);

    void createChattingRoomForRider(long riderId, long userId, long ownerId, long orderId);
}
