package walking_beans.walking_beans_backend.model.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class OrderStoreDTO {
    private Long orderId;
    private String orderNumber;
    private int orderStatus;
    private String orderRequests;
    private int orderTotalPrice;
    private Timestamp orderCreateDate;
    private Timestamp orderModifiedDate;

    // 고객 정보
    private Long customerId; //userId
    private String customerName;
    private String customerPhone;
    private String customerEmail;

    // 라이더 정보
    private Long riderId;
    private String riderName;
    private String riderPhone;

    // 가게 정보
    private Long storeId;
    private Long storeOwnerId;
    private String storeName;
    private String storeDescription;
    private Long storeMainMenu;
    private int storeBusinessNumber;
    private String storePhone;
    private String storeLogo;
    private String storeOperationHours;
    private String storeClosedDates;
    private String storeStatus;
    private int storeReviewCount;
    private double storeRating;
    private Integer storeMinDeliveryTime;
    private Integer storeMaxDeliveryTime;
    private int storeDeliveryTip;
    private String storeDeliveryAddress;
    private String storeAddress;
    private double storeLatitude;
    private double storeLongitude;

    // 주문 주소 정보
    private Long addressId;
    private String orderAddress;
    private String orderDetailedAddress;
    private String orderAddressName;
    private double orderLatitude;
    private double orderLongitude;
    private int orderAddressRole;
}
