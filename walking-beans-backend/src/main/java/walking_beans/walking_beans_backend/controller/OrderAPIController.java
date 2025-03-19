package walking_beans.walking_beans_backend.controller;

import jakarta.mail.Store;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;
import walking_beans.walking_beans_backend.mapper.PaymentMapper;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.dto.Payments;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderOrderStatusDTO;
import walking_beans.walking_beans_backend.model.vo.OrderRequest;
import walking_beans.walking_beans_backend.service.orderService.OrderServiceImpl;

import java.util.List;
import java.util.concurrent.CompletableFuture;

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
    // 주문 상태 변경 ( 0=구매 희망 1=주문 중, 2=주문 접수 대기 중, 3=조리 중, 4=조리 완료, 5=배달 중 6=배달 완료)
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
    public List<Orders> findOrdersByUserId(@PathVariable long userId) {
        return orderService.findOrdersByUserId(userId);
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



    /************************************************************/


    //가게 id로 주문정보, 주문상태만 가져오기
    @GetMapping("/store/{storeId}")
    public List<Orders> findgetLatestOrderForStore(@PathVariable("storeId") long storeId) {
        return orderService.findgetLatestOrderForStore(storeId);
    }

    //주문번호로 뷰 테이블에서 전체 정보 가져오기
    @GetMapping("/ordernumber/{orderNumber}")
    public Orders getOrderListForStore(@PathVariable String orderNumber) {
        return orderService.getOrderListForStore(orderNumber);
    }


    /*
    // 업주용 Long Polling
    @GetMapping("/long-poll")
    public DeferredResult<ResponseEntity<?>> getOrdersLongPoll(@RequestParam("storeId") long storeId) {
        DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>(30000L); // 30초 타임아웃

        deferredResult.onTimeout(() -> {
            deferredResult.setResult(ResponseEntity.ok("새주문 없음"));
        });

        CompletableFuture.supplyAsync(()-> {
            for (int i = 0; i < 5; i++) { // 6초 간격, 최대 30초
                Orders newOrder = orderService.getLatestOrderForStore(storeId);
                if (newOrder != null && newOrder.getOrderStatus() == 0) { // 접수된 주문만
                    return newOrder;
                }
                try {
                    Thread.sleep(6000); // 간격
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            return null;

        }).thenAccept(result -> {
            if (result != null) {
                deferredResult.setResult(ResponseEntity.ok(result));
            } else {
                deferredResult.setResult(ResponseEntity.ok("새 주문 없음"));
            }
        }).exceptionally(throwable -> {
            deferredResult.setErrorResult(ResponseEntity.status(500).body("서버 오류"));
            return null;
        });

        return deferredResult;
    }
    */

}