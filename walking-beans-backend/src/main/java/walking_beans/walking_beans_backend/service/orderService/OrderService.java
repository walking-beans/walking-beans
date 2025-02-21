package walking_beans.walking_beans_backend.service.orderService;

import walking_beans.walking_beans_backend.model.dto.Orders;

import java.util.List;

public interface OrderService {

    Orders getOrderByOrderId(long orderId);

    List<Orders> getOrdersByNullOfRiderIdInDuty();

    Integer updateRiderIdOnDutyOfOrders(long riderId, long orderId);
}
