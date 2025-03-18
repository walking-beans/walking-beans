package walking_beans.walking_beans_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.StoreNotification;
import walking_beans.walking_beans_backend.service.StoreNotificationService;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class StoreNotificationController {

    private final StoreNotificationService storeNotificationService;

    // 사장님이 알림 목록 조회
    @GetMapping("/{storeId}")
    public ResponseEntity<List<StoreNotification>> getNotifications(@PathVariable Long storeId) {
        List<StoreNotification> notifications = storeNotificationService.getNotificationsByStoreId(storeId);
        return ResponseEntity.ok(notifications);
    }

    // 사장님이 특정 알림을 읽음 처리
    @PutMapping("/read/{notificationId}")
    public ResponseEntity<String> markAsRead(@PathVariable Long notificationId) {
        storeNotificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok("알림이 읽음 처리되었습니다.");
    }
}