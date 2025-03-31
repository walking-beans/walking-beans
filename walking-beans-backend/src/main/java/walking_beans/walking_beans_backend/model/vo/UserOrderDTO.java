package walking_beans.walking_beans_backend.model.vo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserOrderDTO {
    private long orderId;
    private long userId;
    private Long orderItemId;
    private String customerName;
    private String storeName;
    private String orderDate;
    private String orderNumber;
    private String deliveryAddress;
    private int totalPayment;
    private String orderRequests;
    private String orderList;
    private int quantity;
    private int orderStatus;
    private String storeLogo;
    private long storeId;
    private String detailedAddress;
    private String orderOptionNames;
    private String orderOptionContents;
    private String orderOptionPrices;
}
