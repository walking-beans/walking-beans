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
public class MenuOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long optionId; //PK
	// 메뉴 아이디
	private long menuId; //FK
	// 옵션 명칭
    private String optionName;

	// 옵션그룹으로 이용
	private String optionContent;
	// 옵션 가격
	private int optionPrice;

	private Timestamp optionCreateDate;

	private Timestamp optionModifiedDate;
}
