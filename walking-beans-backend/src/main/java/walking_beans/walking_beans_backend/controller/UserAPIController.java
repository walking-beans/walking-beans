package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.vo.Vertification;
import walking_beans.walking_beans_backend.service.userService.UserServiceImpl;

import java.util.HashMap;
import java.util.Map;

// 마이페이지랑 맞추기
@RequestMapping("/api/users")
@RestController
public class UserAPIController {

    @Autowired
    private UserServiceImpl userService;

    /**************************** 로그인 ****************************/
    //로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData,
                                                     HttpSession session) {
        String userEmail = loginData.get("userEmail");
        String userPassword = loginData.get("userPassword");
        Map<String, Object> loginResult = userService.loginUser(userEmail,userPassword);

        if ("success".equals(loginResult.get("status"))) {
            session.setAttribute("user", loginResult.get("user"));

            Object userInfo = session.getAttribute("user");
            System.out.println("세션에 저장된 사용자 정보: " + userInfo);

            return ResponseEntity.ok(loginResult);
        }else{
            return ResponseEntity.status(401).body(loginResult);
        }
    }

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        session.invalidate(); // 세션 내 데이터 삭제하고 무효화
        Map<String, Object> result = new HashMap<>();
        result.put("status", "logout success");
        return ResponseEntity.ok(result);
    }

    // 이름과 전화번호로 아이디 찾기
    @GetMapping("/find-id")
    public String findById(@RequestParam("userName") String userName, @RequestParam("userPhone") String userPhone) {
        return userService.findId(userName, userPhone);
    }

    // 비밀번호 변경 (이메일 입력)
    @PutMapping("/find-pw")
    public void updatePassword(@RequestBody Map<String, String> request) {
        String userEmail = request.get("userEmail");
        String userPassword = request.get("newPassword");
        System.out.println(userEmail+"님의 비밀번호가 변경되었습니다: "+userPassword);
        userService.updatePw(userEmail, userPassword);
    }

    // 세션에서 데이터 가져가기
    @GetMapping("/getSessionData")
    public ResponseEntity<Map<String, Object>> getSessionData(HttpSession session) {
        Object userInfo = session.getAttribute("user");

        if (userInfo == null) {
            return ResponseEntity.status(401).body(Map.of("message", "사용자가 로그인하지 않았습니다."));
        }else {
            return ResponseEntity.ok(Map.of("user", userInfo));
        }
    }

    /************************* 이메일 인증 ****************************/

    @PostMapping("/sendCode")
    public String sendCode(@RequestBody Vertification vr) {
        String email = vr.getEmail();
        System.out.println("Controller - email: "+email);

        String code = userService.randomCode();
        System.out.println("Controller - code: "+code);

        userService.saveEmailCode(email, code);
        System.out.println("Controller - Save method: " + email+ " -> " +code);
        userService.sendEmail(email, code);
        System.out.println("Controller - 이메일을 성공적으로 보냄: " +code);
        return "이메일을 성공적으로 보냈습니다." + email;
    }

    @PostMapping("/checkCode")
    public String checkCode(@RequestBody Vertification vr) {
        boolean isValid = userService.verifyCodeWithVo(vr);
        System.out.println("Controller - checkCode method isValid: "+isValid);

        if (isValid) {
            return "인증번호가 일치합니다.";
        }else {
            return "인증번호가 일치하지 않습니다.";
        }
    }
}
