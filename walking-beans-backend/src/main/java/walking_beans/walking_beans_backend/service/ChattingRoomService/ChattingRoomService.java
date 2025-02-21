package walking_beans.walking_beans_backend.service.ChattingRoomService;

import walking_beans.walking_beans_backend.model.dto.ChattingRoom;

import java.util.List;

public interface ChattingRoomService {

    List<ChattingRoom> getAllChattingRoomByReceiverRelation(long userId, int receiverRelation);

    int updateLastMessageOfChattingRoom(long roomId, String roomLastMessage);

}
