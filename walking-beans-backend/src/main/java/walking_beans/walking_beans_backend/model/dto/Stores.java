package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.*;
import lombok.*;

//@Entity
//@Table(name="Stores")
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long storeId;

    private long userId;

    private String storeName;

    private String storeDescription;

    private String storeMainMenu;

    private long storeBusinessNumber;

    private String storePhone;

    private String storePictureUrl;

    private String storeOperationHours;

    private String storeClosedDates;

    private String storeStatus;

    private int storeReviewCount;

    private String storeRating;

    private short storeMinDeliveryTime;

    private short storeMaxDeliveryTime;

    private String storeDeliveryTip;

    private String storeDeliveryAddress;

    private String storeAddress;

    private double storeLatitude; // decimal(10,6)
    private double storeLongitude; // decimal(10,6)
}
