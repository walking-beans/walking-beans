package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.ChattingMember;

import java.util.List;

@Mapper
public interface ChattingMemberMapper {

    List<ChattingMember> getAllChattingMembers(@Param("roomId") long roomId, @Param("userId") long userId);
}
