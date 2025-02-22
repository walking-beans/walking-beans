package walking_beans.walking_beans_backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.UserMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Map<String, Object> loginUser(String userEmail, String userPassword) {
        Map<String, Object> loggedInUser = userMapper.loginUser(userEmail, userPassword);
        System.out.println(loggedInUser);
        Map<String, Object> result = new HashMap<String, Object>();
        if (loggedInUser != null) {
            result.put("status", "success");
            result.put("user", loggedInUser);

        } else {
            result.put("status", "fail");
            result.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        System.out.println("result: " + result);
        return result;
    }

    @Override
    public String findId(String userName, String userPhone) {
        return userMapper.findId(userName, userPhone);
    }

    @Override
    public void updatePw(String userEmail) {
        userMapper.updatePw(userEmail);
    }
}