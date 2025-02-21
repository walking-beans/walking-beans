package walking_beans.walking_beans_backend.service.chattingRoomService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ChattingRoomMapper;
import walking_beans.walking_beans_backend.model.dto.ChattingRoom;

import java.util.List;

@Service
public class ChattingRoomServiceImpl implements ChattingRoomService {

    @Autowired
    private ChattingRoomMapper chattingRoomMapper;

    @Override
    public List<ChattingRoom> getAllChattingRoomByReceiverRelation(long userId, int receiverRelation) {
        return chattingRoomMapper.getAllChattingRoomByReceiverRelation(userId, receiverRelation);
    }

    @Override
    public int updateLastMessageOfChattingRoom(long roomId, String roomLastMessage) {
        return chattingRoomMapper.updateLastMessageOfChattingRoom(roomId, roomLastMessage);
    }


}
