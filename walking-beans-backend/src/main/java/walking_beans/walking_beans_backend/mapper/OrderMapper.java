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

    Orders getOrderByOrderId(long orderId);

    List<Orders> getOrdersByNullOfRiderIdInDuty();

    Integer updateRiderIdOnDutyOfOrders(long riderId, long orderId);

    // 배달현황 : 주문상태&매장정보 가져오기
    void selectOrdersByOrderId(long orderId);

    // 주문 상세 내역 : 상세 내역 가져오기 && 주문하기 : 유저 주소 및 메뉴 정보 가져오기
    Orders selectOrderDetailByOrderId(long orderId);

    // 주문 내역 : 유저 주문 내역 리스트 가져오기
    List<Orders> selectOrderByUserId(long userId);

    // 주문하기 : 주문 등록하기 insertOrder && insertCart
    void insertOrder (@RequestBody Orders order);
    void insertCart (@RequestBody Carts cart);

    Integer updateOrderStatus(long orderId, int orderStatus);

}
