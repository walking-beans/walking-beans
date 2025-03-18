package walking_beans.walking_beans_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.CartOrderMapper;
import walking_beans.walking_beans_backend.model.dto.CartItem;
import walking_beans.walking_beans_backend.model.dto.CartOrderRequestDTO;
import walking_beans.walking_beans_backend.model.dto.CartOrderResponseDTO;
import walking_beans.walking_beans_backend.model.vo.CartItemDTO;

@Service
public class CartOrderServiceImpl implements CartOrderService {
    @Autowired
    private  CartOrderMapper cartOrderMapper;

    @Override
    public CartOrderResponseDTO addToCart(CartOrderRequestDTO requestDTO) {
        // 새로운 주문 생성
        cartOrderMapper.createOrder(requestDTO);

        // 생성된 orderId 가져오기
        Long orderId = cartOrderMapper.getLastInsertedOrderId();

        Long cartId = null;
        for (CartItem item : requestDTO.getCartItems()) {
            cartOrderMapper.addToCart(requestDTO.getUserId(), orderId, requestDTO.getStoreId(), item);
            cartId = cartOrderMapper.getLastInsertedCartId();
        }

        return new CartOrderResponseDTO(cartId, orderId);
    }
}