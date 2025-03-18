package walking_beans.walking_beans_backend.service;

import walking_beans.walking_beans_backend.model.dto.StoreNotification;

import java.util.List;


public interface StoreNotificationService {
    void sendNotification(Long storeId, String message);
    List<StoreNotification> getNotificationsByStoreId(Long storeId);
    void markNotificationAsRead(Long notificationId);
}