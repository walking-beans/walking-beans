package walking_beans.walking_beans_backend.config;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import walking_beans.walking_beans_backend.model.dto.Users;

public class LoginInterceptor implements HandlerInterceptor {


    @Override
    public  boolean preHandle(HttpServletRequest request,
                              HttpServletResponse response,
                              Object handler) throws Exception {

        HttpSession session = request.getSession(); // 로그인을 했다면 request 에서 getssion 에 로그인한 정보가 무엇인지 요청 후 가져오기
        // 위 작성된 session 에는 사용자가 로그인을 했다면 로그인한 정보가 담겨 있을 것

        Users user = (Users)session.getAttribute("user"); // 만약에 로그인해서 가져온 정보 user 라면

        if (user == null) {
            response.sendRedirect("/");
            return false; //user 가 null 값으로 로그인 안 되어 있으면 메인페이지로 리다이렉트
        }

        return true; // 유저로 로그인이 된 경우가 확인되면 요청 허용

    }

}
