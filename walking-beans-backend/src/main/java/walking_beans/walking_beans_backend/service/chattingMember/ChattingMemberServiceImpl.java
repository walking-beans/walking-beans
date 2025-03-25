package walking_beans.walking_beans_backend.service.chattingMember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ChattingMemberMapper;
import walking_beans.walking_beans_backend.model.dto.ChattingMember;

import java.util.List;

@Service
public class ChattingMemberServiceImpl implements ChattingMemberService{

    @Autowired
    private ChattingMemberMapper chattingMemberMapper;

    @Override
    public List<ChattingMember> getAllChattingMembers(long roomId, long userId) {
        return chattingMemberMapper.getAllChattingMembers(roomId, userId);
    }
}
