package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long storeId; //PK

    private long userId; //FK

    private String storeName;
    private String storeDescription;
    private String storeMainMenu;
    private String storeBusinessNumber;
    private String storePhone;
    private String storePictureUrl;
    private String storeOperationHours;
    private String storeClosedDates;
    private String storeStatus;
    private String storeReviewCount;
    private String storeRating;
    private short storeMinDeliveryTime;
    private short storeMaxDeliveryTime;
    private String storeDeliveryTip;
    private String storeDeliveryAddress; // storeDeliveryArea 로 변경요청
    private String storeAddress;
    private double storeLatitude; // decimal(10,6)
    private double storeLongitude; // decimal(10,6)
}
