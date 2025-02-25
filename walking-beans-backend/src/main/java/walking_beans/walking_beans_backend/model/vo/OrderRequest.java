package walking_beans.walking_beans_backend.model.vo;

import lombok.*;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;

import java.util.List;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private Orders order;  // 주문 정보를 저장하는 필드
    private List<Carts> cartList;
}
