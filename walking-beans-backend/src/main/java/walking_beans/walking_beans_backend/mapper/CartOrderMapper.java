package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.CartItem;
import walking_beans.walking_beans_backend.model.dto.CartOrderRequestDTO;
import walking_beans.walking_beans_backend.model.vo.CartItemDTO;

@Mapper
public interface CartOrderMapper {
    void createOrder(CartOrderRequestDTO requestDTO);

    Long getLastInsertedOrderId();

    void addToCart(@Param("userId") Long userId,
                   @Param("orderId") Long orderId,
                   @Param("storeId") Long storeId,
                   @Param("item") CartItem item);

    Long getLastInsertedCartId();
}