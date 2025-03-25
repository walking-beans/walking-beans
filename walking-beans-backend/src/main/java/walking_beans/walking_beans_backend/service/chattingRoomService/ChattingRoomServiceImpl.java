package walking_beans.walking_beans_backend.service.chattingRoomService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ChattingRoomMapper;
import walking_beans.walking_beans_backend.mapper.OrderMapper;
import walking_beans.walking_beans_backend.model.dto.ChattingRoom;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;
import walking_beans.walking_beans_backend.model.dto.admin.UserChattingRoom;
import walking_beans.walking_beans_backend.service.chattingMember.ChattingMemberServiceImpl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ChattingRoomServiceImpl implements ChattingRoomService {
    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ChattingRoomMapper chattingRoomMapper;

    @Autowired
    private ChattingMemberServiceImpl chattingMemberService;

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

    @Override
    public int insertChattingroomByOrderId(long orderId) {
        return chattingRoomMapper.insertChattingroomByOrderId(orderId);
    }

    @Override
    public void createChattingRoomForUserAndOwner(long userId, long orderId) {
        log.info("====== createChattingRoomForUserAndOwner {} time ======", chattingRoomMapper.insertChattingroomByOrderId(orderId));
        long ownerRoomId = chattingRoomMapper.getRoomIdByOrderId(orderId);
        log.info("====== createChattingRoomForRider roomId with ownerRoomId : {} ======", ownerRoomId);

        long ownerId = orderMapper.getOwnerIdByOrderId(orderId);
        log.info("======== ownerId : {} ======", ownerId);

        chattingMemberService.insertChattingMember(ownerRoomId, userId, ownerId, 3);
        chattingMemberService.insertChattingMember(ownerRoomId, ownerId, userId, 1);
    }

    @Override
    public void createChattingRoomForRider(long riderId, long userId, long ownerId, long orderId) {
        log.info("====== createChattingRoomForRider user {} time ======", chattingRoomMapper.insertChattingroomByOrderId(orderId));
        long userRoomId = chattingRoomMapper.getRoomIdByOrderId(orderId);
        log.info("====== createChattingRoomForRider roomId with userId : {} ======", userRoomId);
        chattingMemberService.insertChattingMember(userRoomId, userId, riderId, 2);
        chattingMemberService.insertChattingMember(userRoomId, riderId, userId, 1);

        log.info("====== createChattingRoomForRider owner {} time ======", chattingRoomMapper.insertChattingroomByOrderId(orderId));
        long ownerRoomId = chattingRoomMapper.getRoomIdByOrderId(orderId);
        log.info("====== createChattingRoomForRider roomId with owner : {} ======", ownerRoomId);
        chattingMemberService.insertChattingMember(ownerRoomId, riderId, ownerId, 3);
        chattingMemberService.insertChattingMember(ownerRoomId, ownerId, riderId, 2);
    }
}
