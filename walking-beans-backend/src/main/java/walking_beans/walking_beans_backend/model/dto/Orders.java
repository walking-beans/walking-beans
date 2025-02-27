package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.Column;
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

    private long userId; //FK
    private long storeId; //FK
    private long addressId; //FK

    @Column(unique = true)
    private String orderNumber;
    private int orderStatus;
    private String orderRequests;
    private String orderTotalPrice;
    private String orderCreateDate;
    private String orderModifiedDate;
    private String RiderIdOnDuty;
}
