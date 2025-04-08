package walking_beans.walking_beans_backend.service.userService;

import walking_beans.walking_beans_backend.model.dto.Users;
import walking_beans.walking_beans_backend.model.vo.Vertification;

import java.time.LocalDate;
import java.util.Map;

public interface UserService {
    // 로그인 정보 가져오기
    Map<String, Object> loginUser(String userEmail, String userPassword);

    //Map<String, Object> loginUser(String userEmail, String userPassword);

    // 아이디 찾기
    String findId (String userName, String userPhone);

    // 비밀번호 변경하기
    void updatePw(String userEmail, String userPassword);

    //유저 아이디로 정보 조회(로그인 차단 페이지, 알림리스트 사용)
    Users getUserInfoByIdForAlarms(long userId);

    // 유저 날짜 변경
    void changeUserDate(String userEmail, LocalDate userDate);

    //유저 롤 변경
    void updateUserRole(String email, byte userRole);

        //랜덤 난수 생성
        String randomCode();

        // 보낼 이메일 내용 작성
        void sendEmail(String email, String code);

        // 보낸 이메일 & 인증코드 저장하는 메서드
        void saveEmailCode(String email, String code);

        //일치 여부 확인
        boolean verifyCodeWithVo(Vertification vertification);

    // 마이페이지 사용자 정보 조회
    Users selectUserInfo(Long userId);

    // 프로필 수정
    void updateUserProfile(Long userId, String userPictureUrl);

    // 마이페이지 사용자 정보 수정
    void updateUserInfo(Long userId, String userPhone);

    // 마이페이지 사용자 회원 탈퇴
    void deleteUserAccount(Long userId);


    // 가게 등록시 유저 역활 업데이트
    void updateUserRoleStore(long userId, byte userRole);

    int updateUserRoleByUserId(Long userId, byte userRole);


}