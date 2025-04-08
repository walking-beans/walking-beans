package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.*;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;
import walking_beans.walking_beans_backend.model.dto.order.OrderDetailDTO;
import walking_beans.walking_beans_backend.model.dto.order.UserOrderDTO;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {
    Orders getOrderByOrderId(long orderId);

    List<Orders> getOrdersByNullOfRiderIdInDuty();

    Integer updateRiderIdOnDutyOfOrders(@Param("riderId") long riderId, @Param("orderId") long orderId);

    Integer updateOrderStatus(@Param("orderId") long orderId, @Param("orderStatus") int orderStatus);

    List<Orders> getOrdersByRiderIdOnDuty(@Param("riderIdOnDuty") long riderIdOnDuty);

    RiderOrderStatusDTO getOrderStatusWithRemainingTime(@Param("orderId") long orderId);

    Long getOwnerIdByOrderId(long orderId);

    Integer checkingRiderIdOnDuty(@Param("orderId") long orderId, @Param("riderIdOnDuty") long riderIdOnDuty);

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

    // 주문 저장
    Long createOrder(Map<String, Object> requestData);

    // 선택한 메뉴, 옵션 아이템 저장
    void insertOrderItem(Map<String, Object> orderItemParams);

    // 오더 리스트 조회
    UserOrderDTO getOrderByOrderNumber(String orderNumber);

    // 주문한 유저 정보 조회
    List<UserOrderDTO> getOrdersByUserId(Long userId);

    // 가게 id로 주문정보, 주문상태만 가져오기
    List<Orders> getLatestOrderForStore(long storeId);

    // 주문번호로 전체 정보 가져오기
    UserOrderDTO getOrderForStore(String orderNumber);

    // 주문 상세 내역 정보 가져오기
    List<OrderDetailDTO> getOrderDetailsByOrderNumber(@Param("orderNumber") String orderNumber);

    // 주문 삭제
    int deleteOrderById(long orderId);
}
