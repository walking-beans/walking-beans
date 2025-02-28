package walking_beans.walking_beans_backend.service.cartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.CartMapper;
import walking_beans.walking_beans_backend.mapper.OrderMapper;
import walking_beans.walking_beans_backend.model.dto.Carts;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;


    @Override
    public void insertCart(Carts carts) {
        cartMapper.insertCart(carts);
    }

    @Override
    public void deleteToCart(long cartId) {
        cartMapper.deleteToCart(cartId);
        // orderMapper.updateOrderStatusByCartId(cartId, "주문취소"); 주문완료 상태라면 주문상태를 주문취소로 변경하는 로직 추가하면 최종 코드로 추가필요
    }
}
