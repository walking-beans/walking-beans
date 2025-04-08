package walking_beans.walking_beans_backend.controller;



import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Users;
import walking_beans.walking_beans_backend.service.socialLoginService.SocialLoginServiceImpl;
import walking_beans.walking_beans_backend.service.userService.UserServiceImpl;


import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Map;



@RestController
public class SocialLoginAPIController {

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


    /******************** 카카오 로그인 **************************/

    @GetMapping("/oauth/kakao/login")
    public ResponseEntity<?> getKakaoLoginUrl() {
        String url = "https://kauth.kakao.com/oauth/authorize?response_type=code" +
                "&client_id=" + kakaoClientId + "&redirect_uri=" + redirectUrl;
        return ResponseEntity.ok(url);
    }

    @GetMapping("/oauth/kakao/callback")
    public void handleCallback(@RequestParam("code") String code, HttpServletResponse response){
        Map<String, Object> userMap = socialLoginService.KakaoCallback(code);

        int checkUser = socialLoginService.checkEmailExists(userMap.get("email").toString());

        Integer roleInt = (Integer) userMap.get("role");
        byte role = roleInt.byteValue();
        String phone = (String) userMap.get("phone");

        if (checkUser == 0) {
            // DB에 데이터가 없으면 새 사용자 등록하기
            Users users = new Users();
            users.setUserRole(role);
            users.setUserEmail(userMap.get("email").toString());
            users.setUserPassword("0000");
            users.setUserName(userMap.get("name").toString());
            if (phone == null) {
                users.setUserPhone("no phone"); //전화번호가 없으면 no phone 입력
            } else {
                users.setUserPhone(phone);
            }
            LocalDate today = LocalDate.now();
            users.setUserDate(Date.valueOf(today));

            socialLoginService.insertSocialUser(users); // DB에 정보 저장
        }

        String kakaoEmail = userMap.get("email").toString();
        try {
            System.out.println("성공");


            response.sendRedirect("http://localhost:3000/login?email=" + kakaoEmail);
        } catch (IOException e) {
            System.out.println("오류");
            throw new RuntimeException(e);
        }
    }

    /**************** 네이버 로그인 *******************************/

    @GetMapping("/oauth/naver/login")
    public ResponseEntity<?> getNaverLoginUrl() {
        String url = "https://nid.naver.com/oauth2.0/authorize?response_type=code" +
                "&client_id=" + naverClientId + "&redirect_uri=" + naverRedirectUrl +
                "&state=xyz123";
        return ResponseEntity.ok(url);
    }

    @GetMapping("/oauth/naver/callback")
    public void handleCallback(@RequestParam("code") String code,
                                 @RequestParam("state") String state, HttpServletResponse response) {
        try {
            Map<String, Object> userInfo = socialLoginService.NaverCallback(code, state);

            int checkUser = socialLoginService.checkEmailExists(userInfo.get("email").toString());

            System.out.println(checkUser);

            Integer roleInt = (Integer) userInfo.get("role");
            byte role = roleInt.byteValue();
            String phone = (String) userInfo.get("phone");

            if (checkUser == 0) {
                Users users = new Users();
                users.setUserRole(role);
                users.setUserEmail(userInfo.get("email").toString());
                users.setUserPassword("0000");
                users.setUserName(userInfo.get("name").toString());

                if (phone == null) {
                    users.setUserPhone("no phone");
                } else {
                    users.setUserPhone(phone);
                }
                socialLoginService.insertSocialUser(users);
            }
            String naverEmail = userInfo.get("email").toString();
            response.sendRedirect("http://localhost:3000/login?email=" + naverEmail);
        } catch (Exception e) {
            System.err.println("🚨 네이버 로그인 처리 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
        }
    }

}