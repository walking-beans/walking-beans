package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.sql.Timestamp;

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

    private Timestamp incomeDate;

    private int incomeAmount;
}
