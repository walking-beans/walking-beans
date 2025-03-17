package walking_beans.walking_beans_backend.mapper;

import jakarta.mail.Store;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestBody;
import walking_beans.walking_beans_backend.model.dto.*;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;

import java.util.List;

@Mapper
public interface OrderMapper {
    /**************************************** LEO ****************************************/
    Orders getOrderByOrderId(long orderId);

    List<Orders> getOrdersByNullOfRiderIdInDuty();

    Integer updateRiderIdOnDutyOfOrders(@Param("riderId") long riderId, @Param("orderId") long orderId);

    Integer updateOrderStatus(@Param("orderId") long orderId, @Param("orderStatus") int orderStatus);

    List<Orders> getOrdersByRiderIdOnDuty(@Param("riderIdOnDuty") long riderIdOnDuty);

    RiderOrderStatusDTO getOrderStatusWithRemainingTime(@Param("orderId") long orderId);

    /****************************************  ****************************************/

    // 주문 등록하기
    void insertOrder(Orders order);

    // 주문 정보 가져오기
    Orders findOrderById(long orderId);

    // 주문한 유저 정보 가져오기
    List<Orders> findOrdersByUserId(long userId);

    // 주문한 가게 정보 가져오기
    Stores findStoreByOrderId(@Param("orderId") long orderId);

    // 주문내역 내 오더 정보 가져오기
    Orders getOrderStatus(long orderId);

}
