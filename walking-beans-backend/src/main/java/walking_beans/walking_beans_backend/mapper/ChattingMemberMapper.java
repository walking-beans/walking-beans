package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.ChattingMember;

import java.util.List;

@Mapper
public interface ChattingMemberMapper {

    List<ChattingMember> getAllChattingMembers(@Param("roomId") long roomId, @Param("userId") long userId);

    List<ChattingMember> getUserAndStoreRoomId(@Param("orderId") long orderId, @Param("userId") long userId);

    void insertChattingMember(long roomId, long userId, long receiverId, long receiverRelation);
}
