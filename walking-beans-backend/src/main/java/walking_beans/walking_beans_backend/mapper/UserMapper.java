package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserMapper {
    Map<String, Object> loginUser (String userEmail, String userPassword);

    String findId (String userName, String userPhone);

    void updatePw(String userEmail);
}
