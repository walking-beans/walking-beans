package walking_beans.walking_beans_backend.model.vo;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserCartViewDTO {
    private long userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String menuIds;
    private String menuNames;
    private String menuCategories;
    private String menuPrices;
    private String optionIds;
    private String optionNames;
    private String optionPrices;
    private String totalQuantities;
    private String cartCreateDate;
}

