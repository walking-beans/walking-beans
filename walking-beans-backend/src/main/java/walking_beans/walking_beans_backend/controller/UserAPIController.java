package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.Users;
import walking_beans.walking_beans_backend.service.alarmService.AlarmNotificationService;
import walking_beans.walking_beans_backend.service.userService.UserServiceImpl;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/users")
@RestController
public class UserAPIController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private AlarmNotificationService alarmNotificationService;

    /**************************** 로그인 ****************************/
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData, HttpSession session) {
        String userEmail = loginData.get("userEmail");
        String userPassword = loginData.get("userPassword");

        Map<String, Object> loginResult = userService.loginUser(userEmail, userPassword);
        // 전체 알림 테스트용 코드 ↓
        //alarmNotificationService.sendAdminNotification(Alarms.create(0,1,"전체공지입니다.",4,"testUrl"));
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

    //유저 롤 업데이트
    @PutMapping("/{userEmail}/{userRole}")
    public void updateUser(@PathVariable("userEmail") String userEmail, @PathVariable("userRole") byte userRole) {
        alarmNotificationService.sendOrderNotification(Alarms.create(15,1,"롤이 변경되었습니다.",15,"testUrl"));
        userService.updateUserRole(userEmail, userRole);
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


    // 업로드할 이미지
    @Value("${upload-img}")
    private String uploadPath;

    // 프로필 업로드
    @PostMapping("/mypage/{userId}/uploadProfile")
    public ResponseEntity<?> uploadProfileImage(@PathVariable Long userId,
                                                @RequestParam("file") MultipartFile file) {

        System.out.println("📢 [백엔드] 프로필 업로드 요청 도착! userId: " + userId);
        System.out.println("📢 [백엔드] 요청 Headers: " + file);

        // 🔍 file이 비어있는지 확인!
        if (file == null || file.isEmpty()) {
            System.out.println("❌ 파일이 전달되지 않았습니다!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일이 필요합니다!");
        }
        try {
            String fileName = file.getOriginalFilename();

            System.out.println("업로드된 파일: " + fileName);

             // String filePath = "C:/uploaded/" + fileName;
            String filePath = uploadPath + "/" + fileName;





            file.transferTo(new File(filePath));
            String profileUrl = "http://localhost:7070/uploaded/" + fileName;
            userService.updateUserProfile(userId, profileUrl);
            return ResponseEntity.ok(Map.of("프로필 사진 업로드 성공!", profileUrl));
        }catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("프로필 업로드 실패", e.getMessage()));
        }
    }


    // 마이페이지
    @GetMapping("/mypage/{userId}")
    public ResponseEntity<?> getMyPage(@PathVariable("userId") Long userId) {
        Users user = userService.selectUserInfo(userId);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        return ResponseEntity.ok(user);
    }

    // 회원 탈퇴
    @DeleteMapping("/unlink/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUserAccount(userId);
        return ResponseEntity.ok("회원탈퇴가 성공적으로 이루어졌습니다.");
    }


}

