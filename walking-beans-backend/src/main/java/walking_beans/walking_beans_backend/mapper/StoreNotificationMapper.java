package walking_beans.walking_beans_backend.mapper;


import org.apache.ibatis.annotations.*;
import walking_beans.walking_beans_backend.model.dto.StoreNotification;

import java.util.List;

@Mapper
public interface StoreNotificationMapper {

    //  알림 저장
    void insertNotification(@Param("storeId") Long storeId, @Param("message") String message);

    //  특정 가게의 알림 조회
    List<StoreNotification> getNotificationsByStoreId(@Param("storeId") Long storeId);

    // 특정 알림을 읽음 처리
    void markNotificationAsRead(@Param("notificationId") Long notificationId);
}