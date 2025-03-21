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

@Aspect
@Component
public class OwnershipAspect {
    private final StoreServiceImpl storeService;

    public OwnershipAspect(StoreServiceImpl storeService) {
        this.storeService = storeService;
    }

    @Around("@annotation(OwnershipCheck)")
    public Object checkOwnership(ProceedingJoinPoint joinPoint) throws Throwable{
        Long storeId = (Long) joinPoint.getArgs()[1];
        HttpSession session = (HttpSession) joinPoint.getArgs()[0];
        Long userId = (Long) session.getAttribute("userId");
        System.out.println("세션에 저장되어있는 유저 아이디 : "+storeId);
        if (userId == null) {
            return ResponseEntity.status(401).build(); // 로그인 필요
        }
        Long ownedStoreId = storeService.getStoreIdByUserId(userId);
        System.out.println("불러오는 매장 아이디 : "+ ownedStoreId);
        if (ownedStoreId == null || !ownedStoreId.equals(storeId)) {
            return ResponseEntity.status(403).build(); // 권한없음
        }
        return joinPoint.proceed();
    }

}
