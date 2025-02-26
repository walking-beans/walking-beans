package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.vo.OrderRequest;
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
    

    /****************************************  ****************************************/

    /**
     *  배달 현황 : 주문상태&매장정보 가져오기
     * @param orderId
     */
    @GetMapping("/status/{orderId}")
    public void selectOrdersByOrderId(@PathVariable long orderId) {
        orderService.selectOrdersByOrderId(orderId);
    }

    /**
     * 주문 상세 내역 : 상세 내역 가져오기 && 주문하기 : 유저 주소 및 메뉴 정보 가져오기
     * @param orderId
     * @return
     */
    @GetMapping("/detail/{orderId}")
    public Orders selectOrderDetailByOrderId(@PathVariable long orderId) {
        return orderService.selectOrderDetailByOrderId(orderId);
    }

    /**
     * 주문 내역 : 유저 주문 내역 리스트 가져오기
     * @param userId
     * @return
     */
    @GetMapping("/list/{userId}")
    public List<Orders> selectOrderByUserId(@PathVariable("userId") long userId) {
        return orderService.selectOrderByUserId(userId);
    }


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
