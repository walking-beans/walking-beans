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
public class Carts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cartId; //PK

    private long optionId; //FK
    private long orderId; //FK
    private long storeId; //FK
    private long userId; //FK

    private String cartQuantity;
    private String cartCreateDate;
    private String cartModifiedDate;

}
