package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;
import walking_beans.walking_beans_backend.model.dto.Alarms;

import java.util.List;

@Mapper
public interface AlarmMapper {

    void insertAlarm(Alarms alarm);

    List<Alarms> getUserAlarmList(int userId);

    void deleteAllAlarm(byte userId);
}
