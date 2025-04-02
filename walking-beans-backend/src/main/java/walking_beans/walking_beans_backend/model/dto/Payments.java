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
public class Payments {
    private long paymentId;
    private long orderId;
    private String paymentMethod;
    private String paymentStatus;
}