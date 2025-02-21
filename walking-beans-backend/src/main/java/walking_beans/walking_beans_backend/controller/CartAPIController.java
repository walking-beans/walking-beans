package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.service.cartService.CartService;

@RestController
@RequestMapping("/api/carts")
public class CartAPIController {
    @Autowired
    private CartService cartService;

    // 메뉴 정보 저장
    @PostMapping
    public void addToCart(
            @RequestBody Orders orders,
            @RequestBody Carts carts
    ) {
        cartService.addToCart(orders, carts);
    }

    // 장바구니 내 메뉴 삭제
    @DeleteMapping("/{id}")
    public void deleteToCart(
            @PathVariable long cartId) {
        cartService.deleteToCart(cartId);
    }
}
