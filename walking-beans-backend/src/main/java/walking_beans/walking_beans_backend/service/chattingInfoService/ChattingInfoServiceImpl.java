package walking_beans.walking_beans_backend.service.chattingInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ChattingInfoMapper;
import walking_beans.walking_beans_backend.model.dto.ChattingInfoDTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChattingInfoServiceImpl implements ChattingInfoService{

    @Autowired
    private ChattingInfoMapper chattingInfoMapper;

    @Override
    public Map<Integer, List<ChattingInfoDTO>> getChattingInfoBySenderId(long senderId) {

        List<ChattingInfoDTO> chattingInfoDTOList = chattingInfoMapper.getChattingInfoBySenderId(senderId);

        for (ChattingInfoDTO chattingInfoDTO : chattingInfoDTOList) {
            chattingInfoDTO.setTimeDifference();
        }

        Map<Integer, List<ChattingInfoDTO>> chattingInfoDTOMap = chattingInfoDTOList.stream().collect(Collectors.groupingBy(ChattingInfoDTO::getReceiverRelation));

        return chattingInfoDTOMap;
    }
}
