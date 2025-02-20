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
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int menuId;

    private int storeId;

    private int userId;

    private String menuPrice;

    private String menuPictureUrl;

    private String menuName;

    private String menuCategory;

    private String menuDescription;

    private Timestamp menuCreateDate;

    private Timestamp menuModifiedDate;


}
