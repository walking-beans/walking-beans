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

    private int userId; //FK
    private int storeId; //FK
    private int addressId; //FK

    /*
     * 주문 번호 생성 로직
     * 포맷은 TYYMMDDXXXXXX 이다.
     * T : Type (S : Subscribe, O : 구매, R : 판매)
     * YY : 년도
     * MM : 월
     * DD : 일
     * XXXXX : 5자리 영문자 + 숫자
     */
    @Column(unique = true)
    private String orderNumber;
    private String orderStatus;
    private String orderRequests;
    private String orderTotalPrice;
    private Date orderCreateDate;
    private Date orderModifiedDate;
}
