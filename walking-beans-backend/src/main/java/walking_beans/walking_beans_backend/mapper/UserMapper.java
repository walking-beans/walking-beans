package walking_beans.walking_beans_backend.mapper;


import walking_beans.walking_beans_backend.model.dto.Users;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.Map;

@Mapper
public interface UserMapper {
    // 로그인
    Map<String, Object> loginUser (String userEmail, String userPassword);

    // 아이디 찾기
    String findId (String userName, String userPhone);

    //비밀번호 변경
    void updatePw(String userEmail, String userPassword);

    //소셜 회원 가입
    void insertSocialUser(Users users);

    //회원가입 유무 확인
    int checkEmailExists(String email);

    // 유저 날짜 변경
    void changeUserDate(String userEmail, LocalDate userDate);

    //유저 아이디로 정보 조회(로그인 차단 페이지, 알림리스트 사용)
    Users getUserInfoByIdForAlarms(long userId);

    //유저 롤 업데이트
    void updateUserRole(String userEmail, byte userRole);

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
