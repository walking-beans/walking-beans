package walking_beans.walking_beans_backend.service.OrderService;

import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;

import java.util.List;

public interface OrderService {

    void insertOrder(Orders order, List<Carts> cartList);

    Orders findOrderById(long orderId);

    List<Orders> findOrdersByUserId(long userId);
}
