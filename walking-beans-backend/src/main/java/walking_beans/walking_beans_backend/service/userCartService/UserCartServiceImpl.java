package walking_beans.walking_beans_backend.service.userCartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.UserCartMapper;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.order.UserCartDTO;

import java.util.List;
import java.util.Optional;

@Service
public class UserCartServiceImpl implements UserCartService {

    @Autowired
    private UserCartMapper userCartMapper;

    @Override
    public List<UserCartDTO> findCartViewByUserId(Long userId) {
        return userCartMapper.findCartViewByUserId(userId);
    }

    @Override
    public Optional<Carts> findUserCartByUserAndStore(Long userId, Long storeId) {
        return userCartMapper.findUserCartByUserAndStore(userId, storeId);
    }

    @Override
    public void addToCart(Carts cart) {
        if (cart == null) {
            return;
        }

        Long userId = cart.getUserId();
        Long storeId = cart.getStoreId();
        Long menuId = Long.parseLong(cart.getMenuId());
        String optionId = cart.getOptionId();
        Integer cartQuantity = Integer.parseInt(cart.getCartQuantity());

        Optional<Carts> existingCart = userCartMapper.findCartByUserAndMenu(userId, storeId, menuId, optionId);

        if (existingCart.isPresent()) {
            Carts cartData = existingCart.get();
            Long cartId = cartData.getCartId();
            int newQuantity = Integer.parseInt(cartData.getCartQuantity()) + cartQuantity;
            userCartMapper.updateCartQuantity(cartId, newQuantity);
        } else {
            userCartMapper.insertCartItem(userId, menuId.toString(), storeId, optionId.toString(), cartQuantity.toString());
        }
    }

    @Override
    public void deleteFromCart(Long cartId) {
        userCartMapper.deleteFromCart(cartId);
    }

    @Override
    public void updateCartQuantity(Long cartId, Integer cartQuantity) {
        Optional<Carts> existingCart = userCartMapper.findCartById(cartId);

        if (existingCart.isPresent()) {
            userCartMapper.updateCartQuantity(cartId, cartQuantity);
        }
    }

    @Override
    public void updateCartIfMenuIdIsEmpty(Carts cart) {
        if (cart == null) {
            return;
        }

        Long userId = cart.getUserId();
        Long storeId = cart.getStoreId();
        Long menuId = Long.parseLong(cart.getMenuId());
        String optionId = cart.getOptionId();
        Integer cartQuantity = Integer.parseInt(cart.getCartQuantity());

        userCartMapper.updateCartIfMenuIdIsEmpty(userId, storeId, menuId, cartQuantity, optionId);
    }

    @Override
    public List<Carts> findUserCart(Long userId) {
        return userCartMapper.findUserCart(userId);
    }

    @Override
    public void deleteAllCartsByUserId(Long userId) {
        userCartMapper.deleteAllCartsByUserId(userId);
    }

    @Override
    public void changeStoreIdAndMenu(Long userId, Long storeId) {
        userCartMapper.changeStoreIdAndMenu(userId, storeId);
    }
}
