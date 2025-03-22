package walking_beans.walking_beans_backend.service.orderService;

import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.*;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;
import walking_beans.walking_beans_backend.model.vo.DeliveryStatus;
import walking_beans.walking_beans_backend.model.vo.UserOrderDTO;

import java.util.List;
import java.util.Map;

public interface OrderService {
    /**************************************** Leo  ****************************************/
    Orders getOrderByOrderId(long orderId);

    List<Orders> getOrdersByNullOfRiderIdInDuty();

    Integer updateRiderIdOnDutyOfOrders(long riderId, long orderId);

    Integer updateOrderStatus(long orderId, int orderStatus);

    List<Orders> getOrdersByRiderIdOnDuty(long riderIdOnDuty);

    RiderOrderStatusDTO getOrderStatusWithRemainingTime(@Param("orderId") long orderId);

    /****************************************************************************************/


    // 주문 데이터 저장
    void insertOrder(Orders order, List<Carts> cartList, Payments payments);


    // 주문정보 가져오기
    Orders findOrderById(long orderId);

    // 주문자 정보 가져오기
    List<Orders> findOrdersByUserId(long userId);

    // 주문한 가게 정보 가져오기
    Stores findStoreByOrderId(@Param("orderId") long orderId);

    // 주문내역 내 오더 정보 가져오기
    Orders getOrderStatus(long orderId);

    Long createOrder(Map<String, Object> requestData);

    UserOrderDTO getOrderByOrderNumber(String orderNumber);

    List<UserOrderDTO> getOrdersByUserId(Long userId);
}