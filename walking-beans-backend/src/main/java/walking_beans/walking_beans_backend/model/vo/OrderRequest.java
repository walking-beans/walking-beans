package walking_beans.walking_beans_backend.model.vo;

import lombok.*;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.MenuOption;
import walking_beans.walking_beans_backend.model.dto.Orders;
import walking_beans.walking_beans_backend.model.dto.Payments;

import java.util.List;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private Orders orders;
    private List<Carts> cartList;
    private Payments payments;
}
