package walking_beans.walking_beans_backend.service.userCartService;

import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.order.UserCartDTO;

import java.util.List;
import java.util.Optional;

public interface UserCartService {
    List<UserCartDTO> findCartViewByUserId(Long userId);
    void updateCartIfMenuIdIsEmpty(Carts cart);
    void addToCart(Carts cart);
    void deleteFromCart(Long cartId);

    Optional<Carts> findUserCartByUserAndStore(Long userId, Long storeId);

    void updateCartQuantity(Long cartId, Integer cartQuantity);
    List<Carts> findUserCart(Long userId);
    void deleteAllCartsByUserId(Long userId);

    void changeStoreIdAndMenu(Long userId, Long storeId);


}
