package walking_beans.walking_beans_backend.service.chattingMember;

import walking_beans.walking_beans_backend.model.dto.ChattingMember;

import java.util.List;

public interface ChattingMemberService {

    List<ChattingMember> getAllChattingMembers(long roomId, long userId);
}
