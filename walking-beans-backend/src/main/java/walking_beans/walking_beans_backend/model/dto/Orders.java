package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId; //PK

    private int userId; //FK
    private int storeId; //FK
    private int addressId; //FK

    private String orderNumber;
    private String orderStatus;
    private String orderRequests;
    private String orderTotalPrice;
    private Date orderCreateDate;
    private Date orderModifiedDate;
}
