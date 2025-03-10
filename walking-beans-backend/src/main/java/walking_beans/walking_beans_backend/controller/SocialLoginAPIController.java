package walking_beans.walking_beans_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import walking_beans.walking_beans_backend.model.dto.Users;
import walking_beans.walking_beans_backend.service.socialLoginService.SocialLoginServiceImpl;


import java.util.HashMap;
import java.util.Map;


@RestController
public class SocialLoginAPIController {
/*
    @Autowired
    SocialLoginServiceImpl socialLoginService;

    @Value("${kakao.client-id}")
    private String kakaoClientId;

    @Value("${kakao.redirect-url}")
    private String redirectUrl;

    @Value("${kakao.client-secret}")
    private String kakaoClientSecret;

    @Value("${naver.client-id}")
    private String naverClientId;

    @Value("${naver.client-secret}")
    private String naverClientSecret;

    @Value("${naver.redirect-url}")
    private String naverRedirectUrl;
*/
    /******************** 카카오 로그인 **************************/
/*
    @GetMapping("/oauth/kakao/login")
    public ResponseEntity<?> getKakaoLoginUrl() {
        String url = "https://kauth.kakao.com/oauth/authorize?response_type=code" +
                "&client_id=" + kakaoClientId + "&redirect_uri=" + redirectUrl;
        return ResponseEntity.ok(url);
    }

    @GetMapping("/oauth/kakao/callback")
    public ResponseEntity<Map<String, String>> handleCallback(@RequestParam("code") String code) {
        Map<String, Object> userMap = socialLoginService.KakaoCallback(code);

        int checkUser = socialLoginService.checkEmailExists(userMap.get("email").toString());

        Integer roleInt = (Integer) userMap.get("role");
        byte role = roleInt.byteValue();
        String phone = (String) userMap.get("phone");

        if (checkUser == 0) {
            Users users = new Users();
            users.setUserRole(role);
            users.setUserEmail(userMap.get("email").toString());
            users.setUserName(userMap.get("name").toString());
            if (phone == null) {
                users.setUserPhone("no phone"); //전화번호가 없으면 no phone 입력
            } else {
                users.setUserPhone(phone);
            }

            socialLoginService.insertSocialUser(users); // DB에 정보 저장


        }

        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("redirectUrl", "http://localhost:3000");
        return ResponseEntity.ok(responseMap);
    }
*/
    /**************** 네이버 로그인 *******************************/
/*
    @GetMapping("/oauth/naver/login")
    public ResponseEntity<?> getNaverLoginUrl() {
        String url = "https://nid.naver.com/oauth2.0/authorize?response_type=code" +
                "&client_id=" + naverClientId + "&redirect_uri=" + naverRedirectUrl +
                "&state=xyz123";
        return ResponseEntity.ok(url);
    }

    @GetMapping("/callback")
    public String handleCallback(@RequestParam("code") String code,
                                 @RequestParam("state") String state) {
        try {
            Map<String, Object> userInfo = socialLoginService.NaverCallback(code, state);

            int checkUser = socialLoginService.checkEmailExists(userInfo.get("email").toString());

            System.out.println(checkUser);

            byte role = (byte) userInfo.get("role");
            String phone = (String) userInfo.get("phone");

            if (checkUser == 0) {
                Users users = new Users();
                users.setUserRole(role);
                users.setUserEmail(userInfo.get("email").toString());
                users.setUserName(userInfo.get("nickname").toString());

                if (phone == null) {
                    users.setUserPhone("no phone");
                } else {
                    users.setUserPhone(phone);
                }
                socialLoginService.insertSocialUser(users);
                return "/signupComplete";
            } else {
                return "/failComplete";
            }

        } catch (Exception e) {
            System.err.println("🚨 네이버 로그인 처리 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return "redirect:/error?message=네이버 로그인 오류 발생";
        }
    }
*/
}