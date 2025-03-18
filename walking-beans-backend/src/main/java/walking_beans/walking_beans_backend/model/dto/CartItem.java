package walking_beans.walking_beans_backend.model.dto;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    private Long optionId;
    private Long menuId;
    private Integer cartQuantity;
}