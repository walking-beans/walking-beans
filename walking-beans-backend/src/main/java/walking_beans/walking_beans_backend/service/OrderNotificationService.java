package walking_beans.walking_beans_backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OrderNotificationService {
    @Autowired
    private  SimpMessagingTemplate messagingTemplate;
    @Autowired
    private  StoreNotificationService storeNotificationService;

    public void sendOrderNotification(Long storeId, String message) {
        String destination = "/topic/orders/" + storeId;
        log.info("WebSocket 메시지 전송: {} -> {}", destination, message);
        messagingTemplate.convertAndSend(destination, message);

        storeNotificationService.sendNotification(storeId, message);
    }
}
