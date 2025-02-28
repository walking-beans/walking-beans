package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.service.cartService.CartServiceImpl;

@RestController
@RequestMapping("/api/carts")
public class CartAPIController {
    @Autowired
    private CartServiceImpl cartService;


    // 장바구니에 메뉴 추가 (주문 없이 장바구니만 추가하는 경우)
    @PostMapping
    public void insertCart(@RequestBody Carts carts) {
        cartService.insertCart(carts);
    }

    // 장바구니 내 메뉴 삭제
    @DeleteMapping("/{orderId}")
    public void deleteToCart(
            @PathVariable long cartId) {
        cartService.deleteToCart(cartId);
    }

    //장바구니 상품 개수 가져오기
    @GetMapping("/quantity/{orderId}")
    public Long getCartQuantityByOrderId(@PathVariable("orderId") long orderId) {
        return cartService.getCartQuantityByOrderId(orderId);
    }
}
