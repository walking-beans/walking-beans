package walking_beans.walking_beans_backend.model.dto;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    private int addressId;
    private int userId;
    private String address;
    private String addressName;
    private double addressLatitude;
    private double addressLongitude;
    private int addressRole;

}
