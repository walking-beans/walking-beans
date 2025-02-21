package walking_beans.walking_beans_backend.service.userService;


import walking_beans.walking_beans_backend.model.dto.Users;

import java.util.Map;

public interface UserService {
    Map<String, Object> loginUser(String userEmail, String userPassword);

    String findId (String userName, String userPhone);

    void updatePw(String userEmail);


    // 마이페이지 사용자 정보 조회
    Users selectUserInfo(Long userId);

    // 마이페이지 사용자 정보 수정
    void updateUserInfo(Long userId, String userPhone);

    // 마이페이지 사용자 회원 탈퇴
    void deleteUserAccount(Long userId);




}
