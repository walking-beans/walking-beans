package walking_beans.walking_beans_backend.controller;

import jakarta.persistence.criteria.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.service.OrderService.OrderService;
import walking_beans.walking_beans_backend.service.OrderService.OrderServiceImpl;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/orders")
public class OrderAPIController {

    @Autowired
    private OrderServiceImpl orderService;

    /**
     * 주문 번호에 따른 주문 정보
     * @return Orders
     */
    @GetMapping
    public Orders getOrderByOrderId(@RequestParam("orderId") long orderId) {
        log.info("=== orderId: {} ===", orderId);
        return orderService.getOrderByOrderId(orderId);
    }

    /**
     * untaken 된 오더들
     * @return
     */
    @GetMapping("/untaken")
    public List<Orders> getOrdersByNullOfRiderIdInDuty() {
        
    }


}
