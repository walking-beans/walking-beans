package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;
import walking_beans.walking_beans_backend.model.dto.Alarms;

@Mapper
public interface AlarmMapper {
    void insertAlarm(Alarms alarm);
    void updateLastMessage(@Param("roomId") Long roomId, @Param("message") String message);
}
