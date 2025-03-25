package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;
import walking_beans.walking_beans_backend.service.orderStoreService.OrderStoreServiceImpl;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/order")
public class OrderStoreController {
    @Autowired
    private OrderStoreServiceImpl orderStoreService;


    // 라이더가 배달 가능한 주문 목록 조회
    @GetMapping("/rider")
    public  ResponseEntity<List<OrderStoreDTO>> getOrdersForRider() {
        return ResponseEntity.ok(orderStoreService.getOrdersForRider());
    }

    @GetMapping("/riderIdOnDuty")
    public ResponseEntity<Map<Long, List <OrderStoreDTO>>> getOrdersByRiderIdOnDuty(@RequestParam("lat") double lat,
                                                                    @RequestParam("lng") double lng) {
        log.info("======== /api/order/riderIdOnDuty?lat={}&lng={}", lat, lng);
        return ResponseEntity.ok(orderStoreService.getOrdersByRiderIdOnDuty(lat, lng));
    }

    @GetMapping
    public ResponseEntity<OrderStoreDTO> getOrderByOrderId(@RequestParam("orderId") long orderId) {

        return ResponseEntity.ok(orderStoreService.getOrderByOrderId(orderId));
    }
}
