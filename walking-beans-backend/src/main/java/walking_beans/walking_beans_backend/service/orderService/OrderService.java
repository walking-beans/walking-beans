package walking_beans.walking_beans_backend.service.orderService;

import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.*;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;
import walking_beans.walking_beans_backend.model.dto.order.OrderDetailDTO;
import walking_beans.walking_beans_backend.model.dto.order.UserOrderDTO;

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

    Integer checkingRiderIdOnDuty(@Param("orderId") long orderId, @Param("riderIdOnDuty") long riderIdOnDuty);


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

    Map<String, Object> createOrder(Map<String, Object> requestData);

    UserOrderDTO getOrderByOrderNumber(String orderNumber);

    List<UserOrderDTO> getOrdersByUserId(Long userId);



    /**************************************************************/
    // 가게 id로 주문정보, 주문상태만 가져오기
    List<Orders> getLatestOrderForStore(long storeId);

    // 주문번호로 전체 정보 가져오기
    UserOrderDTO getOrderForStore(String orderNumber);


    // 주문 상세 내역 정보 가져오기
    List<OrderDetailDTO> getOrderDetailsByOrderNumber(@Param("orderNumber") String orderNumber);

    // 주문 삭제
    void deleteOrderById(long orderId);

}