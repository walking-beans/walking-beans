package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Users;
import walking_beans.walking_beans_backend.service.userService.UserServiceImpl;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/users")
@RestController
public class UserAPIController {

    @Autowired
    private UserServiceImpl userService;

    /**************************** 로그인 ****************************/
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData, HttpSession session) {
        String userEmail = loginData.get("userEmail");
        String userPassword = loginData.get("userPassword");

        Map<String, Object> loginResult = userService.loginUser(userEmail, userPassword);

        if ("success".equals(loginResult.get("status"))) {
            session.setAttribute("user", loginResult.get("user"));

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("user", loginResult.get("user"));
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(loginResult);
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("status", "logout success");
        return ResponseEntity.ok(response);
    }

    // 현재 로그인된 유저 데이터 반환
    @GetMapping("/getSessionData")
    public ResponseEntity<Map<String, Object>> getSessionData(HttpSession session) {
        Object userInfo = session.getAttribute("user");

        if (userInfo == null) {
            return ResponseEntity.status(401).body(Map.of("message", "사용자가 로그인하지 않았습니다."));
        } else {
            return ResponseEntity.ok(Map.of("user", userInfo));
        }
    }

    /************************* 이메일 인증 ****************************/
    /*
    @PostMapping("/sendCode")
    public String sendCode(@RequestBody Vertification vr) {
        String email = vr.getEmail();
        String code = userService.randomCode();
        userService.saveEmailCode(email, code);
        userService.sendEmail(email, code);
        return "이메일을 성공적으로 보냈습니다." + email;
    }

    @PostMapping("/checkCode")
    public String checkCode(@RequestBody Vertification vr) {
        boolean isValid = userService.verifyCodeWithVo(vr);
        return isValid ? "인증번호가 일치합니다." : "인증번호가 일치하지 않습니다.";
    }
    */

    // 회원정보 수정
    @PutMapping("/infoCorrection")
    public void updateInfoCorrection(@RequestParam("userId") long userId,
                                     @RequestParam("userPhone") String userPhone) {
        userService.updateUserInfo(userId,userPhone);
    }


//    @GetMapping("/admin/mypage/{userId}")
//    public ResponseEntity<?> getMyPage(@RequestParam("userId") Long userId) {
//        Users user = userService.selectUserInfo(userId);  // ✅ userId를 기반으로 사용자 정보 조회
//
//        if (user == null) {
//            return ResponseEntity.status(404).body("User not found");
//        }
//
//        return ResponseEntity.ok(user);
//    }

    @GetMapping("/mypage/{userId}")  // ✅ userId를 PathVariable로 받음
    public ResponseEntity<?> getMyPage(@PathVariable("userId") Long userId) {
        System.out.println("🔍 요청된 userId: " + userId);  // ✅ userId 확인 로그
        Users user = userService.selectUserInfo(userId);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        return ResponseEntity.ok(user);
    }
}



