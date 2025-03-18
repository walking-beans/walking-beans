package walking_beans.walking_beans_backend.model.dto;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartOrderResponseDTO {
    private Long cartId;
    private Long orderId;
}