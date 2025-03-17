package walking_beans.walking_beans_backend.service.orderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.CartMapper;
import walking_beans.walking_beans_backend.mapper.OrderMapper;
import walking_beans.walking_beans_backend.mapper.PaymentMapper;
import walking_beans.walking_beans_backend.model.dto.*;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;

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

    @Override
    public RiderOrderStatusDTO getOrderStatusWithRemainingTime(long orderId) {
        RiderOrderStatusDTO orderStatusDTO = orderMapper.getOrderStatusWithRemainingTime(orderId);
        // timeRemaining (배달 완료까지 남은 시간) 설정하는 method
        if (orderStatusDTO.definingTimeRemaining()) {
            // timeRemaining 이 0이 아니라면 deadline 시간 설정하기
            orderStatusDTO.definingDeliveryDeadline();
        }
        return orderStatusDTO;
    }

    /****************************************  ****************************************/


    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private PaymentMapper paymentMapper;


    // 주문과 장바구니 데이터를 처리하는 메소드
    @Override
    public void insertOrder(Orders order, List<Carts> cartList, Payments payment) {

        // 주문 데이터 삽입 mysql
        orderMapper.insertOrder(order);

        // Redis 캐싱
        redisService.cacheOrderForStore(order);

        // 주문에 대한 장바구니 데이터 삽입
        for (Carts cart : cartList) {
            cart.setOrderId(order.getOrderId());
            cartMapper.insertCart(cart);
        }

        // 결제 정보 설정
        payment.setOrderId(order.getOrderId());

        // 결제 정보 삽입
        paymentMapper.insertPayments(payment);

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

    /*******************************************/
    //redis
    @Autowired
    private RedisService redisService;

    // storeId 로 최신 주문 확인 (long Polling 용)
    public Orders getLatestOrderForStore(long storeId) {
        Orders latestOrders = redisService.getLatestOrderForStore(storeId); // Redis 확인
        if (latestOrders == null) {
            latestOrders = orderMapper.findgetLatestOrderForStore(storeId); // MySql 조회
            if (latestOrders == null) {
                redisService.cacheOrderForStore(latestOrders);//MySql 에서 가져온값 캐싱
            }
        }
        return latestOrders;
    }

}



