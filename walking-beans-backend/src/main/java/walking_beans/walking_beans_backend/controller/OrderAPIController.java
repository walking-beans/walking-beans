package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.aspect.OwnershipCheck;
import walking_beans.walking_beans_backend.model.dto.Alarms;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;
import walking_beans.walking_beans_backend.model.dto.order.OrderDetailDTO;
import walking_beans.walking_beans_backend.model.dto.order.OrderRequest;
import walking_beans.walking_beans_backend.model.dto.order.UserOrderDTO;
import walking_beans.walking_beans_backend.service.alarmService.AlarmNotificationService;
import walking_beans.walking_beans_backend.service.alarmService.AlarmServiceImpl;
import walking_beans.walking_beans_backend.service.orderService.OrderServiceImpl;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/orders")
public class OrderAPIController {
    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private AlarmServiceImpl alarmService;

    @Autowired
    private AlarmNotificationService alarmNotificationService;

    /**
     * 주문 번호에 따른 주문 정보
     * @param orderId : order Id
     * @return : ResponseEntity.ok(Orders)
     */
    @GetMapping
    public ResponseEntity<Orders> getOrderByOrderId(@RequestParam("orderId") long orderId) {
        log.info("=== orderId: {} ===", orderId);
        return ResponseEntity.ok(orderService.getOrderByOrderId(orderId));
    }

    /**
     * untaken 된 오더들
     * @return :  ResponseEntity.ok(List<Orders>)
     */
    @GetMapping("/untaken")
    public ResponseEntity<List<Orders>> getOrdersByNullOfRiderIdInDuty() {
        return ResponseEntity.ok(orderService.getOrdersByNullOfRiderIdInDuty());
    }


    /**
     * rider 가 '주문 받기' 수령시 therefore, 다른 라이더들이 수령 불가능
     * @param riderId : 주문 받기 누를 rider id
     * @param orderId : order id
     * @return ResponseEntity.ok(Integer) : 변경 갯수
     */
    @PatchMapping("/onme")
    public ResponseEntity<Integer> updateOrdersByRiderIdAndOrderId(@RequestParam("riderId") long riderId,
                                                                   @RequestParam("orderId") long orderId) {
        log.info("=== /onme?riderId: {} ===", riderId);
        return ResponseEntity.ok(orderService.updateRiderIdOnDutyOfOrders(riderId, orderId));
    }

    // 주문 상태 변경 ( 0:결제전 1: 결제완료 2: 주문접수대기(가게에서 확인전) 3: 조리중 4: 조리완료 5: 라이더픽업(배달중) 6: 배달완료 9: 주문취소)
    /**
     * 상태 변경 orderId && orderStatus
     * @param orderId : order Id
     * @param orderStatus : order status
     * @return ResponseEntity.ok(Integer) : 변경 갯수
     */
    @PatchMapping("/orderStatus")
    public ResponseEntity<Integer> updateOrderStatus(@RequestParam("orderId") long orderId,
                                                     @RequestParam("orderStatus") int orderStatus) {
        log.info("=== /orderStatus/orderId: {} ===", orderId);
        OrderStoreDTO orderInfo = alarmService.getOrderInfoForAlarm(orderId);
        if (orderStatus == 4) {
            // 유저 알림 보내기
            alarmNotificationService.sendOrderNotification(Alarms.create(orderInfo.getCustomerId(),1,"주문하신 음식의 조리가 완료되었습니다.", 0,"/user/delivery/status/"+orderInfo.getOrderNumber()));
            // 라이더 알림 보내기
            if (orderInfo.getRiderId() != null) { //라이더 등록이 되어 있다면 알림을 보내기
                alarmNotificationService.sendOrderNotification(Alarms.create(orderInfo.getRiderId(),1,"음식이 준비되었습니다.",0,"/rider/result/"+orderId));
            }
        } else if (orderStatus == 5) {
            // 유저한테 알림 보내기
            alarmNotificationService.sendOrderNotification(Alarms.create(orderInfo.getCustomerId(),1,"음식이 배달중입니다.",0,"/user/delivery/status/"+orderInfo.getOrderNumber()));
        } else if (orderStatus == 6) {
            // 유저한테 알림 보내기
            alarmNotificationService.sendOrderNotification(Alarms.create(orderInfo.getCustomerId(),1,"음식 배달이 완료되었습니다.",0,"/order"));
            // 유저한테 리뷰 요청 알람 보내기
            alarmNotificationService.sendOrderNotification(Alarms.create(orderInfo.getCustomerId(),1,"맛있게 드셨다면 리뷰 작성 부탁드립니다!",0,"/order"));
        }
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, orderStatus));
    }

    @GetMapping("/riderIdOnDuty")
    public ResponseEntity<List<Orders>> getOrdersByRiderIdOnDuty(@RequestParam("riderIdOnDuty") long riderIdOnDuty) {
        return ResponseEntity.ok(orderService.getOrdersByRiderIdOnDuty(riderIdOnDuty));
    }

    @GetMapping("/riderOrderTimeRemaining")
    public ResponseEntity<RiderOrderStatusDTO> getOrderStatusWithRemainingTime(@RequestParam("orderId") long orderId) {
        log.info("=== getOrderStatusWithRemainingTime orderId: {} ===", orderId);
        return ResponseEntity.ok(orderService.getOrderStatusWithRemainingTime(orderId));
    }

    @GetMapping("/checkingRiderIdOnDuty")
    public ResponseEntity<Integer> checkingRiderIdOnDuty(@RequestParam("orderId") long orderId, @RequestParam("riderIdOnDuty") long riderIdOnDuty) {
        log.info("=== /checkingRiderIdOnDuty?orderId={}&riderIdOnDuty={}  ===", orderId, riderIdOnDuty);
        return ResponseEntity.ok(orderService.checkingRiderIdOnDuty(orderId, riderIdOnDuty));
    }

    /**
     * 주문 저장
     * @param request
     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<String> insertOrder(@RequestBody OrderRequest request) {
        try {
            if (request.getPayments() == null) {
                return ResponseEntity.badRequest().body("결제 정보가 누락되었습니다.");
            }

            orderService.insertOrder(request.getOrders(), request.getCartList(), request.getPayments());
            return ResponseEntity.ok("주문 등록 및 결제 정보 저장 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("주문 처리 중 오류가 발생했습니다.");
        }
    }

    /**
     * 주문 정보 가져오기
     * @param orderId
     * @return
     */
    @GetMapping("/{orderId}")
    public Orders findOrderById(@PathVariable long orderId) {
        return orderService.findOrderById(orderId);
    }

    /**
     * 주문한 유저 정보 가져오기
     * @param userId
     * @return
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserOrderDTO>> getOrdersByUserId(@PathVariable Long userId) {
        List<UserOrderDTO> orders = orderService.getOrdersByUserId(userId);
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }

    /**
     * 주문한 가게 정보 가져오기
     * @param orderId
     * @return
     */
    @GetMapping("/storeInfo/{orderId}")
    public Stores findStoreByOrderId(@PathVariable("orderId") long orderId) {
        return orderService.findStoreByOrderId(orderId);
    }

    /**
     * 주문내역 내 오더 정보 가져오기
     * @param orderId
     * @return
     */
    @GetMapping("/info/{orderId}")
    public Orders getOrderStatus(@PathVariable("orderId") long orderId) {
        return orderService.getOrderStatus(orderId);
    }

    /**
     * 오더넘버로 주문내역 가져오기
     * @param orderNumber
     * @return
     */
    @GetMapping("/orderNumber/{orderNumber}")
    public ResponseEntity<UserOrderDTO> getOrder(@PathVariable("orderNumber") String orderNumber) {
        UserOrderDTO order = orderService.getOrderByOrderNumber(orderNumber);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    /**
     * 주문 상세 내역 정보 가져오기
     * @param orderNumber
     * @return
     */
    @GetMapping("/detail/orderNumber/{orderNumber}")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailsByOrderNumber(@PathVariable String orderNumber) {
        List<OrderDetailDTO> orderDetails = orderService.getOrderDetailsByOrderNumber(orderNumber);
        log.info("orderDetails: {}", orderDetails);
        System.out.println("orderDetails = " + orderDetails);
        if (orderDetails.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderDetails);
    }

    /**
     * 주문 삭제
     * @param orderId
     * @return
     */
    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<?> deleteOrderById(@PathVariable long orderId) {
        try {
            orderService.deleteOrderById(orderId);
            return ResponseEntity.ok("주문 내역이 성공적으로 삭제되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.error("주문 삭제 중 예상치 못한 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 주문 삭제에 실패했습니다.");
        }
    }

    // 가게 id로 주문정보, 주문상태만 가져오기
    @GetMapping("/store/{storeId}")
    public List<Orders> getLatestOrderForStore(@PathVariable("storeId") long storeId) {
        return orderService.getLatestOrderForStore(storeId);
    }

    // 주문번호로 뷰 테이블에서 전체 정보 가져오기
    @GetMapping("/ordernumber/{orderNumber}")
    public UserOrderDTO getOrderForStore(@PathVariable String orderNumber) {
        return orderService.getOrderForStore(orderNumber);
    }

    /** 주문번호로 주문상태 업데이트 권한인증때문에 url 다름
     *  상태2 이상 변경시 업주에게 자동 업데이트, updateOrderStatus 서비스에 웹소켓 연결되어있음.
     * @param session 권한검증
     * @param storeId 권한검증
     * @param orderId 목표주문아이디
     * @param orderStatus 변경상태( 0:결제전 1: 결제완료 2: 주문접수대기(가게에서 확인전) 3: 조리중 4: 조리완료 5: 라이더픽업(배달중) 6: 배달완료 9: 주문취소)
     * @return 권한 검증 확인 200 성공, 401,402,403
     */
    @PatchMapping("{orderId}/store/{storeId}")
    @OwnershipCheck
    public ResponseEntity<?> storeUpdateOrderStatus(HttpSession session,
                                                    @PathVariable("storeId") long storeId,
                                                    @PathVariable("orderId") long orderId,
                                                    @RequestBody int orderStatus){
        orderService.updateOrderStatus(orderId, orderStatus);
        return ResponseEntity.ok().build();
    }
}

