package walking_beans.walking_beans_backend.aspect;


import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import walking_beans.walking_beans_backend.service.orderService.OrderService;
import walking_beans.walking_beans_backend.aspect.OwnershipCheck;
import walking_beans.walking_beans_backend.service.storesService.StoreService;
import walking_beans.walking_beans_backend.service.storesService.StoreServiceImpl;

import java.util.Map;

@Aspect
@Component
public class OwnershipAspect {
    private final StoreServiceImpl storeService;

    public OwnershipAspect(StoreServiceImpl storeService) {
        this.storeService = storeService;
    }
    @Around("@annotation(OwnershipCheck)")
    public Object checkOwnership(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        HttpSession session = null;
        Long storeId = null;

        // 동적으로 파라미터 탐색기능 각 타입별로 검색
        for (Object arg : args) {
            if (arg instanceof HttpSession) {
                session = (HttpSession) arg;
            } else if (arg instanceof Long) {
                storeId = (Long) arg;
            }
        }

        if (session == null || storeId == null) { // 둘다 값없을때 400 리턴
            System.out.println("400: 세션 또는 storeId가 전달되지 않음");
            return ResponseEntity.status(400).build();
        }

        Map<String, Object> userMap = (Map<String, Object>) session.getAttribute("user"); // 세션저장이 안되었을때 401
        if (userMap == null) {
            System.out.println("세션에 user 데이터가 없습니다. 세션 ID: " + session.getId());
            return ResponseEntity.status(401).build();
        }

        Long userId = (Long) userMap.get("user_id");  // 세션에 userid 누락시
        System.out.println("User ID: " + userId);

        if (userId == null) {
            System.out.println("401 : userId 없음");
            return ResponseEntity.status(401).build();
        }

        System.out.println("세션에 저장되어있는 유저 아이디 : " + userId + " 가져온 가게 아이디 " + storeId);
        Long ownedStoreId = storeService.getStoreIdByUserId(userId); // 서버에서 유저가 가지고 있는 가게 id호출
        System.out.println("불러오는 매장 아이디 : " + ownedStoreId + " 매장아이디 " + storeId);

        if (ownedStoreId == null || !ownedStoreId.equals(storeId)) { // 요청을 보낸 url의 가게 id와, 유저가 가지고 있는 가게 id가 같지 않을때 권한없음
            System.out.println("403 : userId 와 다름 권한 없음");
            return ResponseEntity.status(403).build();
        }

        System.out.println("200: 권한 통과");
        return joinPoint.proceed();
    }












    /*
    @Around("@annotation(OwnershipCheck)")
    public Object checkOwnership(ProceedingJoinPoint joinPoint) throws Throwable{

        Object[] args = joinPoint.getArgs();
        HttpSession session = (HttpSession) args[0];
        Long storeId = (Long) args[1];
        Map<String, Object> userMap = (Map<String, Object>) session.getAttribute("user");
        //Long userId = (Long) session.getAttribute("user_Id");
        if (userMap == null) {
            System.out.println("세션에 user 데이터가 없습니다.");
        }
        Long userId = (Long) userMap.get("user_id");
        System.out.println("User ID: " + userId);

        System.out.println("세션에 저장되어있는 유저 아이디 : "+userId + "가져온 가게 아이디 "+storeId);
        if (userId == null) {
            System.out.println("401 : userId 없음");
            return ResponseEntity.status(401).build(); // 로그인 필요
        }
        Long ownedStoreId = storeService.getStoreIdByUserId(userId);
        System.out.println("불러오는 매장 아이디 : "+ ownedStoreId + "매장아이디" + storeId);
        if (ownedStoreId == null || !ownedStoreId.equals(storeId)) {
            System.out.println("403 : userId 와 다름 권한 없음");
            return ResponseEntity.status(403).build(); // 권한없음
        }
        System.out.println("200: 권한 통과");
        return joinPoint.proceed();
    }
    */
}
