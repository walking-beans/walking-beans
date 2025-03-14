package walking_beans.walking_beans_backend.service.riderReview;

import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.RiderReview;

public interface RiderReviewService {

    float getRiderReviewRatingAverage(long riderId);

    Integer insertRiderReview(RiderReview riderReview);
}
