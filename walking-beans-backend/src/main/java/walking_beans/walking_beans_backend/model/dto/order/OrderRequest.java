package walking_beans.walking_beans_backend.model.dto.order;

import lombok.*;
import walking_beans.walking_beans_backend.model.dto.*;

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
    private ChattingRoom chattingRoom;
}
