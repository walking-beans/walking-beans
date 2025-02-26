package walking_beans.walking_beans_backend.service.cartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.CartMapper;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;


    @Override
    public Carts insertCart(Orders orders, Carts carts) {
        return cartMapper.insertCart(orders, carts);
    }

    @Override
    public Carts deleteToCart(long cartId) {
        return cartMapper.deleteToCart(cartId);
    }
}
