package walking_beans.walking_beans_backend.service.OrderService;

import walking_beans.walking_beans_backend.model.dto.Orders;

public interface OrderService {

    Orders getOrderByOrderId(long orderId);
}
