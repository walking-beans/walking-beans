package walking_beans.walking_beans_backend.model.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Carts {
    private Long cartId;
    private String menuId; // Long -> String 으로 설정
    private String optionId; // Long -> String 으로 설정
    private Long orderId;
    private Long storeId;
    private Long userId;
    private String cartQuantity; // Long -> String 으로 설정
    private Timestamp cartCreateDate;
    private Timestamp cartModifiedDate;
}
