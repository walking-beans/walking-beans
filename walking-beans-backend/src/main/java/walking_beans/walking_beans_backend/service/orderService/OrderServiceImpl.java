package walking_beans.walking_beans_backend.service.orderService;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.config.WebSocketHandlerOrder;
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

    // 웹소켓
    @Autowired
    private WebSocketHandlerOrder webSocketHandler;



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

        Integer updatedRows = orderMapper.updateOrderStatus(orderId, orderStatus);
        System.out.println("업데이트된 행 수: " + updatedRows + ", 상태: " + orderStatus); // 로그
        //알림받을 조건
        System.out.println("if 블록 진입 직전");
        if (orderStatus > 1 ) { // 주문상태 2이상인 주문들만 필터
            System.out.println("if 블록 진입 성공");
            try {
                // 주문 정보 조회 (알림에 필요한 데이터)
                Orders order = orderMapper.findOrderById(orderId);
                if (order != null) {
                    String message = "{\"orderId\": " + orderId +
                            ", \"orderNumber\": \"" + order.getOrderNumber() +
                            "\", \"orderStatus\": " + orderStatus + "}";
                    webSocketHandler.sendOrderUpdate(message);
                }
            } catch (Exception e) {
                System.out.println("예외처리 : "+e.getMessage());
                e.printStackTrace();
            }
        }
        return updatedRows;
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
        // redisService.cacheOrderForStore(order);

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




    /********************************************/

    /**가게 id로 주문정보, 주문상태만 가져오기
     *
     * @param storeId
     * @return
     */
    @Override
    public List<Orders> findgetLatestOrderForStore(long storeId) {
        return orderMapper.findgetLatestOrderForStore(storeId);
    }

    /** 주문번호로 뷰 테이블에서 전체 정보 가져오기
     *
     * @param orderNumber
     * @return
     */
    @Override
    public Orders getOrderListForStore(String orderNumber) {
        return orderMapper.getOrderListForStore(orderNumber);
    }

    /*******************************************/
    /*
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
    */



}



