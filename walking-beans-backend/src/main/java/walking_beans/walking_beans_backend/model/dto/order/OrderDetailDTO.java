package walking_beans.walking_beans_backend.model.dto.order;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDetailDTO {
    private long orderId;
    private String orderNumber;
    private int orderStatus;
    private LocalDateTime orderCreateDate;

    private String storeName;
    private String storePictureUrl;
    private String storeDeliveryTip;

    private String address;
    private String detailedAddress;
    private String orderRequests;
    private int orderTotalPrice;

    private long orderItemId;
    private String menuName;
    private int menuPrice;
    private int quantity;
// optionIds
    private String optionIds;
    private String optionNames;
    private String optionContents;
    private String optionPrices;
    private int totalOptionPrice;
    private long optionId;

    // 총 메뉴 가격(메뉴 + 옵션 * 수량)을 계산하는 메소드
    public int calculateItemTotalPrice() {
        return (menuPrice + totalOptionPrice) * quantity;
    }
}