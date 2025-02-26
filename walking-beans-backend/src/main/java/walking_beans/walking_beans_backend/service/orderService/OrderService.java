package walking_beans.walking_beans_backend.service.orderService;

import org.springframework.web.bind.annotation.RequestBody;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.dto.Users;

import java.util.List;

public interface OrderService {
    /**************************************** Leo  ****************************************/
    Orders getOrderByOrderId(long orderId);

    List<Orders> getOrdersByNullOfRiderIdInDuty();

    Integer updateRiderIdOnDutyOfOrders(long riderId, long orderId);

    Integer updateOrderStatus(long orderId, int orderStatus);

    /****************************************  ****************************************/

    // 배달현황 : 주문상태 가져오기
    void selectOrdersByOrderId(long orderId);

    // 주문 내역 : 유저 주문 내역 리스트 가져오기
    List<Orders> selectOrderByUserId(long userId);

    // 주문 데이터 저장
    void insertOrder(Orders order, List<Carts> cartList);

    // 주문정보 가져오기
    Orders findOrderById(long orderId);

    // 주문자 정보 가져오기
    List<Orders> findOrdersByUserId(long userId);

}
