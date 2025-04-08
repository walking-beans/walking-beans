package walking_beans.walking_beans_backend.model.dto.order;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderItems {
    private Long orderItemId;
    private String orderNumber;
    private Long menuId;
    private String optionId;
    private int quantity;
}