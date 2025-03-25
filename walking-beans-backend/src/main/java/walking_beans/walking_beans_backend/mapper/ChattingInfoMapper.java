package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.ChattingInfoDTO;

import java.util.List;

@Mapper
public interface ChattingInfoMapper {


    List<ChattingInfoDTO> getChattingInfoBySenderId(@Param("senderId") long senderId);
}
