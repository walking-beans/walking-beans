package walking_beans.walking_beans_backend.controller;

import jakarta.persistence.criteria.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.service.OrderService.OrderService;
import walking_beans.walking_beans_backend.service.OrderService.OrderServiceImpl;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/orders")
public class OrderAPIController {
    @Autowired
    private OrderServiceImpl orderService;

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

    //
}
