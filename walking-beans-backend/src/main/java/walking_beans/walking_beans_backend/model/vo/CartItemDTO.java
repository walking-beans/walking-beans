package walking_beans.walking_beans_backend.model.vo;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    //장바구니 메뉴 데이터 가져오기 DTO
    private long cartId;       // 장바구니 ID
    private long optionId;     // 옵션 ID
    private long menuId;       // 메뉴 ID
    private long orderId;
    private int totalQuantity;
    private String optionName; // 옵션 카테고리
    private String optionContent; // 옵션 이름
    private String optionPrice; // 옵션 가격
    private String menuName;   // 메뉴 이름
    private String menuPrice; // 메뉴 가격
    private long userId;       // 사용자 ID
}
