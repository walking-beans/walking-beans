package walking_beans.walking_beans_backend.service.orderService;

import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.model.dto.Orders;

@Service
public class RedisService { // 업주 view 용

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    // 주문데이터를 redis에 캐싱 (TTL 2시간) StoreId
    public void cacheOrderForStore(Orders order) {
        String key = "store:orders" + order.getStoreId();
        redisTemplate.opsForList().leftPush(key, order); // 최신주문이 리스트 앞쪽에 추가되도록 설정
        redisTemplate.expire(key, 2, java.util.concurrent.TimeUnit.HOURS); //  저장캐시 만료 시간 일단 2시간.
        redisTemplate.opsForList().trim(key,0,30); // 캐싱 주문주 각 key값 마다
    }

    // StoreId 최신 주문 조회
    public Orders getLatestOrderForStore(long storeId) {
        String key = "store:orders" + storeId;
        return (Orders) redisTemplate.opsForList().leftPop(key ,0); // 리스트의 0번만!
    }
}
