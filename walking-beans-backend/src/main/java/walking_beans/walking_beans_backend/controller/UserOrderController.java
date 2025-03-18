package walking_beans.walking_beans_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.dto.UserOrderDTO;
import walking_beans.walking_beans_backend.service.OrderNotificationService;
import walking_beans.walking_beans_backend.service.UserOrderService;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class UserOrderController {
    @Autowired
    private  UserOrderService userOrderService;
    @Autowired
    private  OrderNotificationService orderNotificationService;

    @GetMapping("/{orderNumber}")
    public ResponseEntity<UserOrderDTO> getOrder(@PathVariable String orderNumber) {
        UserOrderDTO order = userOrderService.getOrderByOrderNumber(orderNumber);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserOrderDTO>> getOrdersByUserId(@PathVariable Long userId) {
        List<UserOrderDTO> orders = userOrderService.getOrdersByUserId(userId);
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }


    @PostMapping("/new")
    public String createOrder(@RequestBody Orders order) {

        Long storeId = order.getStoreId();

        orderNotificationService.sendOrderNotification(storeId, "새로운 주문이 들어왔습니다!");

        return "Order Created";
    }
}