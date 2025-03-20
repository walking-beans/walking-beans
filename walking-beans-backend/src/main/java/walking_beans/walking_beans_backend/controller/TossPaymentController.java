package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import walking_beans.walking_beans_backend.service.orderService.OrderServiceImpl;
import walking_beans.walking_beans_backend.service.tossPaymentService.TossPaymentService;
import walking_beans.walking_beans_backend.service.userCartService.UserCartServiceImpl;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@Slf4j
public class TossPaymentController {

    private final TossPaymentService tossPaymentService;
    private final OrderServiceImpl orderService;
    private final UserCartServiceImpl cartService;


    @PostMapping("/request")
    public ResponseEntity<Map<String, Object>> requestPayment(@RequestBody Map<String, Object> requestData) {
        try {
            log.info("결제 요청: {}", requestData);
            return ResponseEntity.ok(Map.of("message", " 결제 요청이 정상적으로 처리되었습니다.", "status", "success"));
        } catch (Exception e) {
            log.error("결제 요청 처리 중 오류 발생:", e);
            return ResponseEntity.badRequest().body(Map.of("error", "결제 요청 실패"));
        }
    }

    /**
     *  DB에 Orders 테이블  주문정보 추가
     *  기존 Cart 데이터 비우기
     *  다시 react 로 전송
     * @param requestData = Carts 테이블
     * @param request
     * @return
     */
    @PostMapping("/confirm")
    @Transactional
    public ResponseEntity<Map<String, Object>> confirmPayment(@RequestBody Map<String, Object> requestData, HttpServletRequest request) {
        try {
            log.info("결제 승인 요청: {}", requestData);
            boolean isApiPayment = request.getRequestURI().contains("/confirm/payment");
            Map<String, Object> response = tossPaymentService.confirmPayment(requestData, isApiPayment);

            if (response.get("error") == null) {
                // Orders 테이블로 주문서 저장
                Long orderId = orderService.createOrder(requestData);
                response.put("orderId", orderId);
                log.info("주문 생성 완료! 주문 ID: {}", orderId);

                Long userId = Long.valueOf(requestData.get("userId").toString());
                // 기존에 저장된 장바구니 비우기
                if (userId != null) {
                    cartService.deleteAllCartsByUserId(userId);
                    log.info("userId={}의 장바구니 삭제 완료", userId);
                }
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("결제 승인 실패: {}", e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "주문 처리 실패: " + e.getMessage()
            );
        }
    }

    @PostMapping("/confirm-billing")
    public ResponseEntity<Map<String, Object>> confirmBilling(@RequestBody Map<String, Object> requestData) {
        try {
            log.info("자동 결제 승인 요청: {}", requestData);
            Map<String, Object> response = tossPaymentService.confirmBilling(requestData);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            log.error("자동 결제 승인 실패:", e);
            return ResponseEntity.badRequest().body(Map.of("error", "자동 결제 승인 실패"));
        }
    }

    @PostMapping("/issue-billing-key")
    public ResponseEntity<Map<String, Object>> issueBillingKey(@RequestBody Map<String, Object> requestData) {
        try {
            log.info("자동결제 빌링키 발급 요청: {}", requestData);
            Map<String, Object> response = tossPaymentService.issueBillingKey(requestData);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            log.error("빌링키 발급 실패:", e);
            return ResponseEntity.badRequest().body(Map.of("error", "빌링키 발급 실패"));
        }
    }

    @GetMapping("/callback-auth")
    public ResponseEntity<Map<String, Object>> callbackAuth(@RequestParam String customerKey, @RequestParam String code) {
        try {
            log.info("브랜드페이 인증 요청: customerKey={}, code={}", customerKey, code);
            Map<String, Object> response = tossPaymentService.callbackAuth(customerKey, code);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            log.error("브랜드페이 인증 실패:", e);
            return ResponseEntity.badRequest().body(Map.of("error", "브랜드페이 인증 실패"));
        }
    }
}