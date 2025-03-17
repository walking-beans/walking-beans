package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RiderReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long riderReviewId;

    private long riderId;

    private long orderId;

    private int riderReviewRating;
}
