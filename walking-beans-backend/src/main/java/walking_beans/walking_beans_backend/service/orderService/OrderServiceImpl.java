package walking_beans.walking_beans_backend.service.orderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.CartMapper;
import walking_beans.walking_beans_backend.mapper.OrderMapper;
import walking_beans.walking_beans_backend.mapper.PaymentMapper;
import walking_beans.walking_beans_backend.model.dto.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Override
    public List<Orders> getOrdersByRiderIdOnDuty(long riderIdOnDuty) {
        List<Orders> orders = orderMapper.getOrdersByRiderIdOnDuty(riderIdOnDuty);
        for (Orders order : orders) {
            order.changeCreateDateFormat();
            if (order.getOrderModifiedDate() != null) {
                order.changeModifiedDateFormat();
            }
        }

        return orders;
    }


    /****************************************  ****************************************/


    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private PaymentMapper paymentMapper;


    // 주문과 장바구니 데이터를 처리하는 메소드
    @Override
    public Map<String, Object> insertOrder(Orders order, List<Carts> cartList, Payments payment) {
        // 1️⃣ 주문 데이터 삽입 (orderId 자동 생성됨)
        orderMapper.insertOrder(order);

        // 2️⃣ 장바구니 데이터 삽입 (cartId 자동 생성됨)
        for (Carts cart : cartList) {
            cart.setOrderId(order.getOrderId());
            cartMapper.insertCart(cart);
        }

        // 3️⃣ 결제 정보 삽입
        payment.setOrderId(order.getOrderId());
        paymentMapper.insertPayments(payment);

        // 4️⃣ 반환할 데이터 생성
        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.getOrderId());
        response.put("storeId", order.getStoreId());
        response.put("cartIdList", cartList.stream().map(Carts::getCartId).toList()); // cartId 리스트

        return response;
    }


    // 주문 정보 가져오기
    @Override
    public Orders findOrderById(long orderId) {
        return orderMapper.findOrderById(orderId);
    }

    // 주문한 유저 정보 가져오기
    @Override
    public List<Orders> findOrdersByUserId(long userId) {
        return orderMapper.findOrdersByUserId(userId);
    }


    // 주문한 가게 정보 가져오기
    @Override
    public Stores findStoreByOrderId(long orderId) {
        return orderMapper.findStoreByOrderId(orderId);
    }

    // 주문내역 내 오더 정보 가져오기
    @Override
    public Orders getOrderStatus(long orderId) {
        return orderMapper.getOrderStatus(orderId);
    }

}
