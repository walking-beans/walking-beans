package walking_beans.walking_beans_backend.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.StoreNotificationMapper;
import walking_beans.walking_beans_backend.model.dto.StoreNotification;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class StoreNotificationServiceImpl implements StoreNotificationService {

    private final StoreNotificationMapper storeNotificationMapper;

    // 알림 저장 (WebSocket으로 주문이 오면 이 함수 실행)
    @Override
    public void sendNotification(Long storeId, String message) {
        storeNotificationMapper.insertNotification(storeId, message);
        log.info("알림 저장 완료 - 매장 ID: {}, 메시지: {}", storeId, message);
    }

    // 특정 가게의 알림 목록 조회
    @Override
    public List<StoreNotification> getNotificationsByStoreId(Long storeId) {
        return storeNotificationMapper.getNotificationsByStoreId(storeId);
    }

    //  특정 알림 읽음 처리
    @Override
    public void markNotificationAsRead(Long notificationId) {
        storeNotificationMapper.markNotificationAsRead(notificationId);
        log.info("알림 읽음 처리 완료 - 알림 ID: {}", notificationId);
    }
}