package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.Id;
import lombok.*;

import java.sql.Timestamp;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuOption {

	@Id
    private long optionId;

	private long menuId;

    private String optionName;

	private String optionContent;

	private String optionPrice;

	private Timestamp optionCreateDate;

	private Timestamp optionModifiedDate;

}
