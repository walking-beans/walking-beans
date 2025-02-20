package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.Id;
import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    private long addressId;
    private long userId;
    private String address;
    private String addressName;
    private double latitude;
    private double longitude;
    private short addressRole;



    /*
     `address_id` bigint(20) NOT NULL AUTO_INCREMENT,
    `user_id` bigint(20) NOT NULL,
    `address` varchar(255) NOT NULL,
    `address_name` varchar(255) NOT NULL,
    `address_latitude` decimal(10,6) NOT NULL,
    `address_longitude` decimal(10,6) NOT NULL,
    `address_role` TINYINT NOT NULL, -- '사용할 주소(선택 시 1번)'
     PRIMARY KEY (`address_id`),
     */
}
