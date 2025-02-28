package walking_beans.walking_beans_backend.model.vo.rider;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RiderMainStoreInfo {

    private int orderId;

    private String storeName;

    private int incomeAmount;

    private double storeLatitude; // decimal(10,6)

    private double storeLongitude; // decimal(10,6)

    private String orderCreateDate;

    private String storePictureUrl;

}
