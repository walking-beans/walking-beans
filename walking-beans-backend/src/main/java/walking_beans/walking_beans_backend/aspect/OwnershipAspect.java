package walking_beans.walking_beans_backend.aspect;


import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import walking_beans.walking_beans_backend.aspect.OwnershipCheck;
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

        //파라미터 탐색 방법들
        /* 파라미터 배열 순서에 따라서 가져오는 코드를 썼지만, 너무 에러나기 쉬운 조건이라서 약간의 여유가 있어보이는
        파라미터 종류로 탐색 기능을 작성 하지만 메뉴 추가시에 파라미터 혼동 에러가 발생.
        에러의 이유가 long 값이 두개여서 탐색이 바로 종료되는줄알았지만,
        그러지 않고 후순위 long값으로 덮어씌워져서 가게아이디 값에, 유저아이디 값이 덮어씌여져서 인증이 정상작동하지 않았음.
        간단하게 가게 아이디를 뒤로 옮기면 되지 않나 싶지만, 덮어쓰기가일어나는 함수에 권한인증을 맏기엔 정상작동을 담보를 할수 없음.
        // 동적으로 파라미터 탐색기능 각 타입별로 검색
        for (Object arg : args) {
            if (arg instanceof HttpSession) {// 세션 정보 가져오기
                session = (HttpSession) arg;
            } else if (arg instanceof Long) {// 페이지에 있는 가게 번호 가져오기
                storeId = (Long) arg;
            }
        }
        */
        /* 직접 탐색용 코드 aspectj 라이브러리를 이용해서 파라미터 객체의 이름을 직접 탐색
        org.aspectj.lang.Signature signature = joinPoint.getSignature();
        String[] parameterNames = ((org.aspectj.lang.reflect.MethodSignature)signature).getParameterNames();

        for (int i = 0; i < args.length; i++) {
            String paramName = parameterNames[i];
            Object arg = args[i];
            if ("session".equals(paramName) && arg instanceof HttpSession) {
                session = (HttpSession) arg;
            } else if ("storeId".equals(paramName) && arg instanceof Long) {
                storeId = (Long) arg;
            }
        }
        */
        // session == null, storeId == null 일때만 탐색하도록 진행. 배열의 순서보다는 좀더 여유로우면서 쓸만한것 같다,
        // 파라미터의 순서는 컨트롤러에 작성된 파라미터 순서 위에서 아래 혹은 왼쪽에서 오른쪽순서대로 index0 부터 시작
        for (Object arg : args) {
            if (session == null && arg instanceof HttpSession) {
                session = (HttpSession) arg;
            } else if (storeId == null && arg instanceof Long) {
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
