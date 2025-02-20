package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.security.Timestamp;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    private long userId;

    private long storeId;

    private int reviewStarRating;

    private String reviewContent;

    private Timestamp reviewCreatedDate;

    private Timestamp reviewModifiedDate;

    private String reviewPictureUrl;

}
