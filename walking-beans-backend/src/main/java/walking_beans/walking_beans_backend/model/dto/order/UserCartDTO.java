package walking_beans.walking_beans_backend.model.dto.order;

import lombok.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCartDTO {
    private Long userId;
    private Long cartId;
    private Long storeId;
    private Long cartQuantity;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String menuIds;
    private String menuNames;
    private String menuCategories;
    private String menuPrices;
    private String optionIds;
    private String optionNames;
    private String optionContents;
    private String optionPrices;
    private String totalQuantities;
    private LocalDateTime cartCreateDate;

    // 쉼표로 구분된 데이터를 List로 변환하는 메서드
    public List<String> getMenuIdList() {
        return menuIds != null ? Arrays.asList(menuIds.split(",")) : List.of();
    }

    public List<String> getMenuNameList() {
        return menuNames != null ? Arrays.asList(menuNames.split(",")) : List.of();
    }

    public List<String> getOptionNameList() {
        return optionNames != null ? Arrays.asList(optionNames.split(",")) : List.of();
    }

    public List<String> getOptionContentList() {
        return optionContents != null ? Arrays.asList(optionContents.split(",")) : List.of();
    }

    public List<Integer> getOptionPriceList() {
        return optionPrices != null ? Arrays.stream(optionPrices.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList()) : List.of();
    }

    public List<Integer> getTotalQuantityList() {
        return totalQuantities != null ? Arrays.stream(totalQuantities.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList()) : List.of();
    }
}