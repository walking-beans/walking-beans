package walking_beans.walking_beans_backend.service.socialLoginService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;
import walking_beans.walking_beans_backend.mapper.UserMapper;
import walking_beans.walking_beans_backend.model.dto.Users;

import java.util.HashMap;
import java.util.Map;


@Service
public class SocialLoginServiceImpl implements SocialLoginService {
/*
    @Autowired
    private UserMapper userMapper;

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

    @Override
    public void insertSocialUser(Users users) {
        userMapper.insertSocialUser(users);
    }

    @Override
    public int checkEmailExists(String email) {
        return userMapper.checkEmailExists(email);
    }
*/
    /******************** 카카오 로그인 *******************************/
/*
    @Override
    public Map<String, Object> KakaoCallback(String code){
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoClientId);
        params.add("redirect_uri", redirectUrl);
        params.add("code", code);
        if (kakaoClientSecret != null) {
            params.add("client_secret", kakaoClientSecret);
        }

        HttpEntity<LinkedMultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
        String accessToken = (String) response.getBody().get("access_token");

        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> userRequest = new HttpEntity<>(userHeaders);
        ResponseEntity<Map> userResponse = restTemplate.postForEntity(userInfoUrl, userRequest, Map.class);

        Map userInfo = userResponse.getBody();

        Map<String, Object> kakaoAccount = (Map<String, Object>) userInfo.get("kakao_account");
        Object email = kakaoAccount.get("email");
        Object name = kakaoAccount.get("name");
        String phone = (String) kakaoAccount.get("phone_number");

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("role",0); // 롤 유저로 고정 입력받는걸로 수정하기
        resultMap.put("email", email);
        resultMap.put("name", name);
        resultMap.put("phone", phone);

        return resultMap;

    }
*/
    /********************* 네이버 로그인 *************************/
/*
    @Override
    public Map<String, Object> NaverCallback(String code, String state) {
        String tokenUrl = "https://nid.naver.com/oauth2.0/token";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", naverClientId);
        params.add("client_secret", naverClientSecret);
        params.add("code", code);
        params.add("state", state);

        HttpEntity<LinkedMultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
        if (response.getBody() == null || !response.getBody().containsKey("access_token")) {
            System.err.println("🚨 네이버 로그인 실패: 액세스 토큰을 받아오지 못했습니다.");
        }

        String accessToken = (String) response.getBody().get("access_token");

        String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> userRequest = new HttpEntity<>(userHeaders);
        ResponseEntity<Map> userResponse = restTemplate.postForEntity(userInfoUrl, userRequest, Map.class);

        if (userResponse.getBody() == null || !userResponse.getBody().containsKey("response")) {
            System.err.println("🚨 네이버 사용자 정보를 가져올 수 없습니다.");
        }
        Map userInfo = userResponse.getBody();
        System.out.println("🚨 userInfo: :"+ userInfo);
        Map<String, Object> responseData = (Map<String, Object>) userInfo.get("response");

        String email = (String) responseData.get("email");
        String nickname = (String) responseData.get("nickname");
        String phone = (String) responseData.get("mobile");
        String phoneWithoutHyphen = phone.replaceAll("-", "");


        if (email == null) email = "이메일 없음";

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("role",0); // 롤 유저로 고정
        resultMap.put("email", email);
        resultMap.put("nickname", nickname);
        resultMap.put("phone", phoneWithoutHyphen);
        return resultMap;
    }
*/
}