package walking_beans.walking_beans_backend.service.cartService;

import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.vo.CartItemDTO;

import java.util.List;

public interface CartService {
    // 메뉴 정보 저장 (order 랑 같이 생성)
    void insertCart(Carts carts);

    // 장바구니 메뉴 1개 삭제
    void deleteToCart(long cartId);

    // 장바구니 상품 개수 가져오기
    Long getCartQuantityByOrderId (long orderId);

    // 장바구니 메뉴 데이터 가져오기
    CartItemDTO getCartInfoByCartId (long cartId);
    Carts findCartById(long cartId);
    // 장바구니 주문자 기준 카트 데이터 가져오기
    List<CartItemDTO> getCartInfoByOrderId (long orderId);
}