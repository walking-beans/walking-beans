package walking_beans.walking_beans_backend.controller;

import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.vo.OrderRequest;
import walking_beans.walking_beans_backend.service.OrderService.OrderServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderAPIController {

    @Autowired
    private OrderServiceImpl orderService;

    // 주문 및 장바구니를 생성하는 API
    @PostMapping
    public String insertOrder(@RequestBody OrderRequest request) {
        orderService.insertOrder(request.getOrder(), request.getCartList());  // 주문과 장바구니 정보 처리
        return "Order & Cart created successfully!";
    }

    @GetMapping("/{orderId}")
    public Orders findOrderById(@PathVariable long orderId) {
        return orderService.findOrderById(orderId);
    }

    @GetMapping("/user/{userId}")
    public List<Orders> findOrdersByUserId(@PathVariable long userId) {
        return orderService.findOrdersByUserId(userId);
    }

}
