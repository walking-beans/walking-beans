package walking_beans.walking_beans_backend.model.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserOrderDTO {
    private Long userId;
    private String customerName;
    private String storeName;
    private String orderDate;
    private String orderNumber;
    private String deliveryAddress;
    private Integer totalPayment;
    private String specialRequests;
    private String orderList;
}
