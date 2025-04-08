package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.order.UserCartDTO;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserCartMapper {

    List<UserCartDTO> findCartViewByUserId(Long userId);

    List<Carts> findUserCart(Long userId);
    Optional<Carts> findUserCartByUserAndStore(@Param("userId") Long userId, @Param("storeId") Long storeId);
    Optional<Carts> findCartByUserAndMenu(Long userId, Long storeId, Long menuId, String optionId);

    void updateCartIfMenuIdIsEmpty(Long userId, Long storeId, Long menuId, Integer cartQuantity, String optionId);

    void updateCartQuantity(Long cartId, Integer cartQuantity);
    Optional<Carts> findCartById(Long cartId);
    void insertCartItem(Long userId, String menuId, Long storeId, String optionId, String cartQuantity);
    void deleteAllCartsByUserId(Long userId);

    void deleteFromCart(Long cartId);

    void insertCart(Carts cart);

    void changeStoreIdAndMenu(Long userId, Long storeId);
}