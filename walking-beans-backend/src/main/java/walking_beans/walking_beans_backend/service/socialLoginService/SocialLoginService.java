package walking_beans.walking_beans_backend.service.socialLoginService;


import walking_beans.walking_beans_backend.model.dto.Users;

import java.util.Map;

public interface SocialLoginService {

    // 소셜 회원 가입
    void insertSocialUser(Users users);

    // 회원가입 유무 확인
    int checkEmailExists(String email);

    // 카카오 회원가입
    Map<String, Object> KakaoCallback(String code);

    // 네이버 회원가입
    Map<String, Object> NaverCallback(String code, String state);

}