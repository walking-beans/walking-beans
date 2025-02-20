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
public class DeliveryIncome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int incomeIndex;

    private int riderId;

    private int orderId;

    private Date incomeDate;

    private int incomeAmount;
}
