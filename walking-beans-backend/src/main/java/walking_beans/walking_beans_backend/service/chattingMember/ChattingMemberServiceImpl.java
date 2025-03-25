package walking_beans.walking_beans_backend.service.chattingMember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ChattingMemberMapper;
import walking_beans.walking_beans_backend.model.dto.ChattingMember;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChattingMemberServiceImpl implements ChattingMemberService{

    @Autowired
    private ChattingMemberMapper chattingMemberMapper;

    @Override
    public List<ChattingMember> getAllChattingMembers(long roomId, long userId) {
        return chattingMemberMapper.getAllChattingMembers(roomId, userId);
    }

    @Override
    public  Map<Integer, Long> getUserAndStoreRoomId(long orderId, long userId) {

        List<ChattingMember> chattingmembers = chattingMemberMapper.getUserAndStoreRoomId(orderId, userId);

        Map<Integer, Long> result = new HashMap<>();
        for (ChattingMember chattingMember : chattingmembers) {
            result.put(chattingMember.getReceiverRelation(), chattingMember.getRoomId());
        }

        return result;
    }

    @Override
    public void insertChattingMember(long roomId, long userId, long receiverId, long receiverRelation) {
        chattingMemberMapper.insertChattingMember(roomId, userId, receiverId, receiverRelation);
    }
}
