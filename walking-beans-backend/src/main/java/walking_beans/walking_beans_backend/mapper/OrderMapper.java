package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestBody;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.Users;

import java.util.List;

@Mapper
public interface OrderMapper {
    /**************************************** LEO ****************************************/
    Orders getOrderByOrderId(long orderId);

    List<Orders> getOrdersByNullOfRiderIdInDuty();

    Integer updateRiderIdOnDutyOfOrders(long riderId, long orderId);

    Integer updateOrderStatus(long orderId, int orderStatus);

    /****************************************  ****************************************/

    // 주문 등록하기
    void insertOrder(Orders order);

    // 주문 정보 가져오기
    Orders findOrderById(long orderId);

    // 주문한 유저 정보 가져오기
    List<Orders> findOrdersByUserId(long userId);


}
