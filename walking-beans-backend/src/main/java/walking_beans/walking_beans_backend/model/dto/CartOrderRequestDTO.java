package walking_beans.walking_beans_backend.model.dto;

import lombok.*;
import walking_beans.walking_beans_backend.model.vo.CartItemDTO;

import java.util.List;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartOrderRequestDTO {
    private Long userId;
    private Long storeId;
    private List<CartItem> cartItems;
    private Integer totalPrice;
    private String orderRequest;
}