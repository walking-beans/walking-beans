package walking_beans.walking_beans_backend.service.chattingMember;

import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.ChattingMember;

import java.util.List;
import java.util.Map;

public interface ChattingMemberService {

    List<ChattingMember> getAllChattingMembers(long roomId, long userId);

    Map<Integer, Long> getUserAndStoreRoomId(long orderId, long userId);

    void insertChattingMember(long roomId, long userId, long receiverId, long receiverRelation);
}
