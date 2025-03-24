package walking_beans.walking_beans_backend.service.chattingRoomService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ChattingRoomMapper;
import walking_beans.walking_beans_backend.model.dto.ChattingRoom;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;
import walking_beans.walking_beans_backend.model.dto.admin.UserChattingRoom;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChattingRoomServiceImpl implements ChattingRoomService {
    @Autowired
    private ChattingRoomMapper chattingRoomMapper;

    @Override
    public List<ChattingRoom> getAllChattingRoomByReceiverRelation(long userId, int receiverRelation) {
        return chattingRoomMapper.getAllChattingRoomByReceiverRelation(userId, receiverRelation);
    }

    @Override
    public int updateLastMessageOfChattingRoom(long roomId, String lastMessage) {
        return chattingRoomMapper.updateLastMessageOfChattingRoom(roomId, lastMessage);
    }

    @Override
    public List<UserChattingRoom> getUserChattingRoomByUserId(long userId, int receiverRelation) {
        return chattingRoomMapper.getUserChattingRoomByUserId(userId, receiverRelation);
    }

    @Override
    public long getRoomIdByOrderId(long orderId) {
        return chattingRoomMapper.getRoomIdByOrderId(orderId);
    }

}
