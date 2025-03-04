package walking_beans.walking_beans_backend.service.cartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.CartMapper;
import walking_beans.walking_beans_backend.model.dto.Carts;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;

    // 메뉴 정보 저장 (order 랑 같이 생성)
    @Override
    public void insertCart(Carts carts) {
        cartMapper.insertCart(carts);
    }

    // 장바구니 메뉴 1개 삭제
    @Override
    public void deleteToCart(long cartId) {
        cartMapper.deleteToCart(cartId);
        // orderMapper.updateOrderStatusByCartId(cartId, "주문취소"); 주문완료 상태라면 주문상태를 주문취소로 변경하는 로직 추가하면 최종 코드로 추가필요
    }

    // 장바구니 상품 개수 가져오기
    @Override
    public Long getCartQuantityByOrderId(long orderId) {
        return cartMapper.getCartQuantityByOrderId(orderId);
    }
}