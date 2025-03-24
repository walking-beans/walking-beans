package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Payments;
import walking_beans.walking_beans_backend.service.orderService.OrderServiceImpl;
import walking_beans.walking_beans_backend.service.tossPaymentService.TossPaymentService;
import walking_beans.walking_beans_backend.service.tossPaymentService.TossPaymentServiceImpl;
import walking_beans.walking_beans_backend.service.userCartService.UserCartServiceImpl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@Slf4j
public class TossPaymentController {

    @Autowired
    private final TossPaymentServiceImpl tossPaymentService;
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
     * @param requestData
     * @return
     */
    private void validatePaymentData(Map<String, Object> requestData) {
        // 필수 필드 체크
        String[] requiredFields = {
                "orderNumber", "userId", "storeId",
                "addressId", "orderTotalPrice", "cartList"
        };

        for (String field : requiredFields) {
            if (!requestData.containsKey(field) ||
                    requestData.get(field) == null ||
                    (requestData.get(field) instanceof String &&
                            ((String) requestData.get(field)).trim().isEmpty())) {
                throw new IllegalArgumentException(field + " 결제 정보가 누락되었습니다.");
            }
        }

        // cartList 추가 검증
        List<Map<String, Object>> cartList = (List<Map<String, Object>>) requestData.get("cartList");
        if (cartList == null || cartList.isEmpty()) {
            throw new IllegalArgumentException("장바구니 정보가 없습니다.");
        }

        // 각 cartItem 필수 정보 검증
        for (Map<String, Object> item : cartList) {
            if (!item.containsKey("menuId") ||
                    item.get("menuId") == null) {
                throw new IllegalArgumentException("메뉴 정보가 누락되었습니다.");
            }
        }
    }

    @PostMapping("/confirm")
    @Transactional
    public ResponseEntity<Map<String, Object>> confirmPayment(
            @RequestBody Map<String, Object> requestData,
            HttpServletRequest request
    ) {
        try {
            log.info("결제 승인 요청 데이터: {}", requestData);

            // 데이터 검증
            validatePaymentData(requestData);

            // 요청된 결제 수단 확인
            Map<String, Object> paymentData = (Map<String, Object>) requestData.get("payments");
            String paymentMethod = paymentData != null ? (String) paymentData.get("paymentMethod") : "";
            log.info("결제 데이터: {}", paymentData);

            Map<String, Object> response = new HashMap<>();

            if ("meetPayment".equals(paymentMethod)) {
                log.info("만나서 결제 선택됨. 결제 승인 과정 생략");

                // 주문 생성
                Long orderId = orderService.createOrder(requestData);
                response.put("orderId", orderId);
                log.info("주문 생성 완료! 주문 ID: {}", orderId);

                Payments payment = new Payments();
                payment.setOrderId(orderId);
                payment.setPaymentMethod(paymentMethod);
                payment.setPaymentStatus("완료");
                tossPaymentService.insertPayments(payment);

            } else {
                boolean isApiPayment = request.getRequestURI().contains("/confirm/payment");
                response = tossPaymentService.confirmPayment(requestData, isApiPayment);

                if (response.get("error") == null) {
                    Long orderId = orderService.createOrder(requestData);
                    response.put("orderId", orderId);
                    log.info("주문 생성 완료! 주문 ID: {}", orderId);
                }
            }

            // 장바구니 삭제 (만나서 결제든 일반 결제든 동일하게 처리)
            Long userId = Long.valueOf(requestData.get("userId").toString());
            if (userId != null) {
                cartService.deleteAllCartsByUserId(userId);
                log.info("userId={}의 장바구니 삭제 완료", userId);
            }

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            log.error("결제 정보 검증 실패: {}", e.getMessage());
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("결제 승인 실패: {}", e.getMessage(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "서버 처리 중 오류 발생"));
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

    @GetMapping("/method/{orderId}")
    public Payments getPaymentByOrderId(@PathVariable Long orderId) {
        return tossPaymentService.getPaymentByOrderId(orderId);
    }

}