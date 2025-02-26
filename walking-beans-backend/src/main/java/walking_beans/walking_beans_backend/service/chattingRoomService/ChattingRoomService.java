package walking_beans.walking_beans_backend.service.chattingRoomService;

import walking_beans.walking_beans_backend.model.dto.ChattingRoom;

import java.util.List;

public interface ChattingRoomService {

    List<ChattingRoom> getAllChattingRoomByReceiverRelation(long userId, int receiverRelation);

    int updateLastMessageOfChattingRoom(long roomId, String lastMessage);


}
