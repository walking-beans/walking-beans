package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.service.userService.UserServiceImpl;

import java.util.HashMap;
import java.util.Map;

// 마이페이지랑 맞추기
@RequestMapping("/api/users")
@RestController
public class UserAPIController {

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserServiceImpl userServiceImpl;

    //로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData,
                                                     HttpSession session) {
        String userEmail = loginData.get("userEmail");
        String userPassword = loginData.get("userPassword");
        Map<String, Object> loginResult = userService.loginUser(userEmail,userPassword);

        if ("success".equals(loginResult.get("status"))) {
            session.setAttribute("user", loginResult.get("user"));
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

    // 비밀번호 변경
    @PutMapping("/find-pw")
    public void updatePassword(@RequestParam("userEmail") String userEmail) {
        userService.updatePw(userEmail);
    }
    //user 테스트
}
