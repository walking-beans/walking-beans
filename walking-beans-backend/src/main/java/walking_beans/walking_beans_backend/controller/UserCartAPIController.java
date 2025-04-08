package walking_beans.walking_beans_backend.controller;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.order.UserCartDTO;
import walking_beans.walking_beans_backend.service.userCartService.UserCartServiceImpl;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/cart")
public class UserCartAPIController {

    @Autowired
    private UserCartServiceImpl userCartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserCartDTO>> findCartViewByUserId(@PathVariable(name = "userId") Long userId) {
        log.info("장바구니 요청 userId: {}", userId);

        try {
            List<UserCartDTO> cartItems = userCartService.findCartViewByUserId(userId);
            log.info("장바구니 응답 데이터: {}", cartItems);

            if (cartItems == null || cartItems.isEmpty()) {
                log.warn("⚠장바구니가 비어 있습니다.");
                return ResponseEntity.ok(Collections.emptyList());
            }

            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            log.error("장바구니 조회 중 오류 발생:", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody Carts cart) {
        try {
            log.info("[Controller] 받은 장바구니 데이터: {}", cart);

            if (cart.getUserId() == null || cart.getUserId() == 0) {
                log.error(" userId가 없습니다. 요청 데이터를 확인하세요.");
                return ResponseEntity.badRequest().body("userId가 없습니다.");
            }

            if (cart.getMenuId() == null || cart.getMenuId().equals("0")) {
                log.info("[Controller] menu_id가 0이므로 업데이트 진행");
                userCartService.updateCartIfMenuIdIsEmpty(cart);
            } else {
                userCartService.addToCart(cart);
            }

            return ResponseEntity.ok("장바구니 추가 성공");
        } catch (Exception e) {
            log.error("장바구니 추가 실패", e);
            return ResponseEntity.internalServerError().body("장바구니 추가 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<String> deleteFromCart(@PathVariable Long cartId) {
        log.info("🗑 장바구니 삭제 요청 cartId: {}", cartId);
        try {
            userCartService.deleteFromCart(cartId);
            return ResponseEntity.ok("장바구니 삭제 성공");
        } catch (Exception e) {
            log.error("장바구니 삭제 중 오류 발생:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장바구니 삭제 실패");
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<String> updateCartQuantity(@RequestBody Carts cart) {
        log.info(" PATCH 요청 도착: {}", cart);

        try {
            Long cartId = cart.getCartId();
            Integer newQuantity = Integer.parseInt(cart.getCartQuantity());

            log.info("장바구니 수량 변경: cartId={}, newQuantity={}", cartId, newQuantity);

            // 서비스 계층 호출 (cartId로 기존 데이터 조회 후 업데이트)
            userCartService.updateCartQuantity(cartId, newQuantity);

            return ResponseEntity.ok("장바구니 수량 변경 성공");
        } catch (Exception e) {
            log.error("장바구니 수량 변경 중 오류 발생:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장바구니 수량 변경 실패");
        }
    }

    @GetMapping("/store/{userId}")
    public ResponseEntity<List<Carts>> getUserCart(@PathVariable Long userId) {
        log.info("userId={}의 장바구니 정보 요청", userId);
        List<Carts> cartList = userCartService.findUserCart(userId);

        if (cartList.isEmpty()) {
            log.warn(" userId={}의 장바구니가 비어 있음", userId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cartList);
    }

/*
    @PatchMapping("/update")
    public ResponseEntity<String> updateCartQuantity(@RequestBody Map<String, Object> requestData) {
        try {
            if (!requestData.containsKey("userId") || !requestData.containsKey("storeId") ||
                    !requestData.containsKey("menuId") || !requestData.containsKey("cartQuantity")) {
                log.error("🚨 요청 데이터가 불완전합니다: {}", requestData);
                return ResponseEntity.badRequest().body("🚨 요청 데이터가 불완전합니다.");
            }

            Long userId = Long.valueOf(requestData.get("userId").toString());
            Long storeId = Long.valueOf(requestData.get("storeId").toString());
            Long menuId = Long.valueOf(requestData.get("menuId").toString());
            Integer newQuantity = Integer.parseInt(requestData.get("cartQuantity").toString());

            log.info("🔄 장바구니 수량 변경: userId={}, storeId={}, menuId={}, newQuantity={}",
                    userId, storeId, menuId, newQuantity);

            userCartService.updateCartQuantity(userId, storeId, menuId, newQuantity);
            return ResponseEntity.ok("장바구니 수량 변경 성공");
        } catch (Exception e) {
            log.error("🚨 장바구니 수량 변경 중 오류 발생:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장바구니 수량 변경 실패");
        }
    }


 */

    @DeleteMapping("/{userId}/store/{storeId}")
    public ResponseEntity<Void> clearCartForDifferentStore(@PathVariable Long userId, @PathVariable Long storeId) {
        log.info("다른 스토어로 이동하여 장바구니 자동 삭제 - userId: {}, storeId: {}", userId, storeId);
        try {
            userCartService.changeStoreIdAndMenu(storeId, userId);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (EntityNotFoundException e) {
            log.warn("장바구니 없음 - userId: {}, storeId: {}", userId, storeId);
            return ResponseEntity.notFound().build(); // 404 Not Found
        } catch (Exception e) {
            log.error("장바구니 삭제 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }
}