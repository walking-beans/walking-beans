package walking_beans.walking_beans_backend.model.dto.rider;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RiderMainStoreInfo {

    private String storeName;

    private long userId;

    private long orderId;

    private double storeLatitude; // decimal(10,6)

    private double storeLongitude; // decimal(10,6)

    private String storeAddress;

    private String storePhone;

    private String orderCreateDate;

    private String storeClosedDates;

    private String storeStatus;

    private String storeDeliveryTip;

    private short storeMaxDeliveryTime;

    private String storePictureUrl;
}
