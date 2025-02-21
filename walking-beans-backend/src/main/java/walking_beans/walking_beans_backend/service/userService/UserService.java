package walking_beans.walking_beans_backend.service.userService;

import java.util.Map;

public interface UserService {
    Map<String, Object> loginUser(String userEmail, String userPassword);

    String findId (String userName, String userPhone);

    void updatePw(String userEmail);
}
