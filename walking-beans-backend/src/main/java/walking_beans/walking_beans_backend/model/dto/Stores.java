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
    private int storeDeliveryTip;
    private String storeDeliveryAddress; // storeDeliveryArea 로 변경요청
    private String storeAddress;

}
