package walking_beans.walking_beans_backend.model.dto.rider;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RiderMainStoreInfo {

    private long orderId;

    private long userId;

    private String storeName;

    private int incomeAmount;

    private double storeLatitude; // decimal(10,6)

    private double storeLongitude; // decimal(10,6)

    private String orderCreateDate;

    private String storePictureUrl;

}
