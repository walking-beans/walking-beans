/*
package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.service.socialLoginService.SocialLoginServiceImpl;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
public class SocialLoginAPIController {
 /*
    @Value("${kakao.client-id}")
    private String kakaoClientId;

    @Value("${kakao.redirect-url}")
    private String redirectUrl;

    @Value("${kakao.client-secret}")
    private String kakaoClientSecret;

    @Autowired
    private SocialLoginServiceImpl socialLoginService;

    @GetMapping("/oauth/kakao/login")
    public ResponseEntity<?> getKakaoLoginUrl() {
        String url = "https://kauth.kakao.com/oauth/authorize?response_type=code" +
                "&client_id=" + kakaoClientId + "&redirect_uri=" + redirectUrl;
        return ResponseEntity.ok(url);
    }

    @GetMapping("/api/users/oauth/kakao/callback")
    public String handleCallback(@RequestParam String code) {
        // Service를 통해 카카오 사용자 정보 가져오기
        Map<String, Object> userInfo = socialLoginService.handleCallback(code);

        // 가져온 사용자 정보에서 필요한 값 추출
        String nickname = (String) userInfo.get("nickname");
        String profileImg = (String) userInfo.get("profileImg");
        String email = (String) userInfo.get("email");
        String name = (String) userInfo.get("name");
        String gender = (String) userInfo.get("gender");
        String birthday = (String) userInfo.get("birthday");

        // 데이터가 잘 반환되었는지 확인
        System.out.println("User Info: " + userInfo);

        // 회원가입 페이지로 리다이렉트

        return "redirect:/signup/kakao?nickname=" + URLEncoder.encode(nickname, StandardCharsets.UTF_8)
                + "&email=" + email
                + "&profileImg=" + profileImg
                + "&name=" + URLEncoder.encode(name, StandardCharsets.UTF_8)
                + "&gender=" + gender
                + "&birthday=" + birthday;


        return null;
    }
    */

}
*/
