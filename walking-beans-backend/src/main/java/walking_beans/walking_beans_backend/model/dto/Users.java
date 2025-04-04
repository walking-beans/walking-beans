package walking_beans.walking_beans_backend.model.dto;

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
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId; //PK

    private byte userRole;

    private String userEmail;

    private String userPassword;

    private String userName;

    private String userPhone;

    private Date userBirthday;

    private String userPictureUrl;

    private Date userDate;
}
