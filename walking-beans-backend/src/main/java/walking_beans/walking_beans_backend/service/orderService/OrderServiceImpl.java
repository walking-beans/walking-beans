package walking_beans.walking_beans_backend.service.orderService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.OrderMapper;
import walking_beans.walking_beans_backend.mapper.PaymentMapper;
import walking_beans.walking_beans_backend.mapper.UserCartMapper;
import walking_beans.walking_beans_backend.model.dto.*;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;
import walking_beans.walking_beans_backend.model.vo.DeliveryStatus;
import walking_beans.walking_beans_backend.model.vo.OrderItems;
import walking_beans.walking_beans_backend.model.vo.UserOrderDTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
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
    private UserCartMapper userCartMapper;

    @Autowired
    private PaymentMapper paymentMapper;

    // 오더 리스트
    @Override
    public UserOrderDTO getOrderByOrderNumber(String orderNumber) {
        return orderMapper.getOrderByOrderNumber(orderNumber);
    }

    @Override
    public List<UserOrderDTO> getOrdersByUserId(Long userId) {
        return orderMapper.getOrdersByUserId(userId);
    }

    // 주문과 장바구니 데이터를 처리하는 메소드
    @Override
    public void insertOrder(Orders order, List<Carts> cartList, Payments payment) {

        // 주문 데이터 삽입
        orderMapper.insertOrder(order);


        // 주문에 대한 장바구니 데이터 삽입
        for (Carts cart : cartList) {
            cart.setOrderId(order.getOrderId());
            userCartMapper.insertCart(cart);
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

    // orderNumber 영어 대문자, 숫자 랜덤 8자리
    public class OrderNumberGenerator {
        public static String generateOrderNumber() {
            return UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
        }
    }

    @Override
    public Long createOrder(Map<String, Object> requestData) {
        log.info("주문 정보 저장 요청: {}", requestData);

        try {
            // 주문번호(랜덤) 생성)
            String orderNumber = requestData.get("orderNumber").toString();
            if (orderNumber == null || orderNumber.isEmpty()) {
                orderNumber = OrderNumberGenerator.generateOrderNumber();
            }
            requestData.put("orderNumber", orderNumber);

            // 요청사항
            if (requestData.containsKey("orderRequests")) {
                log.info("요청사항: {}", requestData.get("orderRequests"));
            } else {
                log.warn("요청사항이 없습니다.");
            }

            // 기본 데이터 타입 변환 (String → Long & int)
            Long userId = Long.parseLong(requestData.get("userId").toString());
            Long storeId = Long.parseLong(requestData.get("storeId").toString());
            Long addressId = Long.parseLong(requestData.get("addressId").toString());
            int orderTotalPrice = Integer.parseInt(requestData.get("orderTotalPrice").toString());

            requestData.put("userId", userId);
            requestData.put("storeId", storeId);
            requestData.put("addressId", addressId);
            requestData.put("orderTotalPrice", orderTotalPrice);

            // `orders` 테이블에 주문 생성
            orderMapper.createOrder(requestData);
            log.info("주문 저장 완료! 주문 번호: {}", orderNumber);
            log.info("▶ orders 테이블 삽입 데이터: {}", requestData);

            // `cartList` 데이터를 `order_items` 테이블에 저장
            Object cartListObj = requestData.get("cartList");

            if (cartListObj instanceof List) {
                List<Map<String, Object>> cartItems = (List<Map<String, Object>>) cartListObj;
                log.info("cartItems 개수: {}", cartItems.size());

                for (Map<String, Object> item : cartItems) {
                    // `menuId` 처리
                    Object menuIdObj = item.get("menuId");
                    if (menuIdObj == null) {
                        log.warn("메뉴 ID가 없는 아이템 스킵");
                        continue;
                    }
                    Long menuId = Long.parseLong(menuIdObj.toString());

                    // `optionId` 처리
                    String optionIds = item.containsKey("optionIds")
                            ? item.get("optionIds").toString()
                            : null;
                    Long optionId = null;
                    if (optionIds != null && !optionIds.isEmpty()) {
                        String[] optionIdArray = optionIds.split(",");
                        optionId = Long.parseLong(optionIdArray[0]);
                    }

                    // `quantity` 처리
                    Object quantityObj = item.get("totalQuantities");
                    if (quantityObj == null) {
                        log.warn("수량 정보가 없는 아이템 스킵");
                        continue;
                    }
                    int quantity = Integer.parseInt(quantityObj.toString());

                    // MyBatis에 전달할 데이터 생성
                    Map<String, Object> orderItemParams = new HashMap<>();
                    orderItemParams.put("orderNumber", orderNumber);
                    orderItemParams.put("menuId", menuId);
                    orderItemParams.put("optionId", optionId);
                    orderItemParams.put("quantity", quantity);

                    // `order_items` 테이블에 삽입
                    orderMapper.insertOrderItem(orderItemParams);
                    log.info("주문 아이템 저장 완료: {}", orderItemParams);
                }
            } else {
                log.warn("cartList가 List 타입이 아닙니다.");
            }

            return userId;
        } catch (Exception e) {
            log.error("❌ 주문 저장 중 오류 발생: ", e);
            throw new RuntimeException("주문 저장 실패");
        }
    }
}
