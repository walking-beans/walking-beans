package walking_beans.walking_beans_backend.model.vo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryStatus {
    private long orderId;
    private String orderNumber;
    private int orderStatus;
    private String orderRequests;
    private int orderTotalPrice;
    private String orderCreateDate;
    private String orderModifiedDate;
    private String RiderIdOnDuty;

    private long customerId;
    private String customerName;
    private String customerPhone;
    private String customerEmail;

    private long riderId;
    private String riderName;
    private String riderPhone;

    private long storeId;
    private long storeOwnerId;
    private String storeName;
    private String storeDescription;
    private long storeMainMenu;
    private long storeBusinessNumber;
    private String storePhone;
    private String storeLogo;
    private String storeOperationHours;
    private String storeClosedDates;
    private String storeStatus;
    private int storeReviewCount;
    private String storeRating;
    private short storeMinDeliveryTime;
    private short storeMaxDeliveryTime;
    private String storeDeliveryTip;
    private String storeAddress;
    private double storeLatitude;
    private double storeLongitude;
    private String storeDeliveryAddress;

    private long addressId;
    private String orderAddress;
    private String orderDetailedAddress;
    private String orderAddressName;
    private double orderLatitude;
    private double orderLongitude;
    private byte orderAddressRole;
}
