
package walking_beans.walking_beans_backend.service.userService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.UserMapper;


import walking_beans.walking_beans_backend.model.dto.Users;
import walking_beans.walking_beans_backend.model.vo.Vertification;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;


    @Autowired
    private JavaMailSender mailSender;



/******************************로그인***************************/

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
            //result.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        System.out.println("result: " + result);
        return result;
    }

    @Override
    public String findId(String userName, String userPhone) {
        return userMapper.findId(userName, userPhone);
    }

    @Override
    public void updatePw(String userEmail, String userPassword) {
        userMapper.updatePw(userEmail, userPassword);
    }





/************************이메일 인증**************************/
/*
    private Map<String, String> verificationCodes = new HashMap<String, String>();

    //랜덤 난수 생성
    public String randomCode() {
        Random rand = new Random();
        int randomNum = 100000 + rand.nextInt(900000);
        return String.valueOf(randomNum);
    }

    // 보낼 내용 작성
    public void sendEmail(String email, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("인증번호입니다.");
        message.setText("인증번호를 입력하세요: " + code);
        mailSender.send(message);
        System.out.println("메일을 성공적으로 보냈습니다. "+email);
    }

    // 보낸 이메일 & 인증코드 저장하는 메서드
    public void saveEmailCode(String email, String code) {
        System.out.println("=== Service - Save Email Code ===");
        verificationCodes.put(email.toLowerCase(), code);
        System.out.println("Save Email Code: " + email.toLowerCase()+ " ->" + code);
        //보낸 이메일과 인증번호를 저장
        // 이메일은 소문자로 저장
    }

    // 일치여부 확인
    public boolean verifyCodeWithVo(Vertification vertification) {
        String email = vertification.getEmail().toLowerCase();
        System.out.println("=== Service - Verify Code With VO ===");
        System.out.println("email: " + email);

        String getCode = vertification.getCode();
        System.out.println("inputCode: " + getCode);
        String saveCode = verificationCodes.get(email);
        System.out.println("saveCode: " + saveCode);

        return saveCode.equals(vertification.getCode());
    }
*/


/***********************마이 페이지*****************************/

    @Override
    public Users selectUserInfo(Long userId) {
        return userMapper.selectUserInfo(userId); // DB에서 유저 정보 가져오기
    }

    @Override
    public void updateUserInfo(Long userId, String userPhone) {
        userMapper.updateUserInfo(userId, userPhone); // DB에서 유저 정보 수정
    }

    @Override
    public void deleteUserAccount(Long userId) {
        userMapper.deleteUserAccount(userId); // DB에서 유저 삭제
    }
}
