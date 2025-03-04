package walking_beans.walking_beans_backend.service.orderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.OrderMapper;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    /**************************************** Leo ****************************************/
    @Override
    public Orders getOrderByOrderId(long orderId) {
        return orderMapper.getOrderByOrderId(orderId);
    }

    @Override
    public List<Orders> getOrdersByNullOfRiderIdInDuty() {
        return orderMapper.getOrdersByNullOfRiderIdInDuty();
    }

    @Override
    public Integer updateRiderIdOnDutyOfOrders(long riderId, long orderId) {
        return orderMapper.updateRiderIdOnDutyOfOrders(riderId, orderId);
    }

    @Override
    public Integer updateOrderStatus(long orderId, int orderStatus) {
        return orderMapper.updateOrderStatus(orderId, orderStatus);
    }

    /****************************************  ****************************************/

    @Override
    public void selectOrdersByOrderId(long orderId) {
        orderMapper.selectOrdersByOrderId(orderId);
    }

    @Override
    public Orders selectOrderDetailByOrderId(long orderId) {
        return orderMapper.selectOrderDetailByOrderId(orderId);
    }

    @Override
    public List<Orders> selectOrderByUserId(long userId) {
        return orderMapper.selectOrderByUserId(userId);
    }

    @Override
    public void insertOrder(Orders order) {
        orderMapper.insertOrder(order);
    }

    @Override
    public void insertCart(Carts cart) {
        orderMapper.insertCart(cart);
    }


}