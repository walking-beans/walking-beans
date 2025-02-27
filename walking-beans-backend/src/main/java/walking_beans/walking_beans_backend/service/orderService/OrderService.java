package walking_beans.walking_beans_backend.service.orderService;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestBody;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.MenuOption;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.dto.Users;

import java.util.List;

public interface OrderService {
    /**************************************** Leo  ****************************************/
    Orders getOrderByOrderId(long orderId);

    List<Orders> getOrdersByNullOfRiderIdInDuty();

    Integer updateRiderIdOnDutyOfOrders(long riderId, long orderId);

    Integer updateOrderStatus(long orderId, int orderStatus);

    List<Orders> getOrdersByRiderIdOnDuty(long riderIdOnDuty);

    /****************************************  ****************************************/


    // 주문 데이터 저장
    void insertOrder(Orders order, List<Carts> cartList, List<MenuOption> menuOptionList);

    // 주문정보 가져오기
    Orders findOrderById(long orderId);

    // 주문자 정보 가져오기
    List<Orders> findOrdersByUserId(long userId);
}
