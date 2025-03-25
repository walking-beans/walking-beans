package walking_beans.walking_beans_backend.service.chattingInfoService;

import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.ChattingInfoDTO;

import java.util.List;
import java.util.Map;

public interface ChattingInfoService {

    Map<Integer, List<ChattingInfoDTO>> getChattingInfoBySenderId(long senderId);

}
