package walking_beans.walking_beans_backend.controller;

import jakarta.mail.Store;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.mapper.PaymentMapper;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.dto.Payments;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;
import walking_beans.walking_beans_backend.model.vo.OrderRequest;
import walking_beans.walking_beans_backend.model.vo.UserOrderDTO;
import walking_beans.walking_beans_backend.service.orderService.OrderServiceImpl;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/orders")
public class OrderAPIController {
    @Autowired
    private OrderServiceImpl orderService;

    /**************************************** LEO ****************************************/
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
    @PutMapping("/onme")
    public ResponseEntity<Integer> getOrdersByRiderIdInDuty(@RequestParam("riderId") long riderId,
                                                            @RequestParam("orderId") long orderId) {
        return ResponseEntity.ok(orderService.updateRiderIdOnDutyOfOrders(riderId, orderId));
    }
    // 주문 상태 변경 ( 0:결제전 1: 결제완료 2: 조리중 3: 조리완료 4: 라이더픽업(배달중) 5: 배달완료 6: 주문취소)
    /**
     * 상태 변경 orderId && orderStatus
     * @param orderId : order Id
     * @param orderStatus : order status
     * @return ResponseEntity.ok(Integer) : 변경 갯수
     */
    @PutMapping("/orderStatus")
    public ResponseEntity<Integer> updateOrderStatus(@RequestParam("orderId") long orderId,
                                                     @RequestParam("orderStatus") int orderStatus) {

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

    /****************************************  ****************************************/




    // 주문 저장
    @PostMapping("/create")
    public String insertOrder(@RequestBody OrderRequest request) {
        if (request.getPayments() == null) {
            return "결제 정보가 누락되었습니다.";
        }

        orderService.insertOrder(request.getOrders(), request.getCartList(), request.getPayments());
        return "주문 등록 및 결제 정보 저장 완료";
    }


    // 주문 정보 가져오기
    @GetMapping("/{orderId}")
    public Orders findOrderById(@PathVariable long orderId) {
        return orderService.findOrderById(orderId);
    }

    // 주문한 유저 정보 가져오기
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserOrderDTO>> getOrdersByUserId(@PathVariable Long userId) {
        List<UserOrderDTO> orders = orderService.getOrdersByUserId(userId);
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }

    // 주문한 가게 정보 가져오기
    @GetMapping("/storeInfo/{orderId}")
    public Stores findStoreByOrderId(@PathVariable("orderId") long orderId) {
        return orderService.findStoreByOrderId(orderId);
    }

    // 주문내역 내 오더 정보 가져오기
    @GetMapping("/info/{orderId}")
    public Orders getOrderStatus(@PathVariable("orderId") long orderId) {
        return orderService.getOrderStatus(orderId);
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<UserOrderDTO> getOrder(@PathVariable String orderNumber) {
        UserOrderDTO order = orderService.getOrderByOrderNumber(orderNumber);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }




}