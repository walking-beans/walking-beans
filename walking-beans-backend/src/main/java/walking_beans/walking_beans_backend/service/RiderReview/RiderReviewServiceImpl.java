package walking_beans.walking_beans_backend.service.RiderReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.RiderReviewMapper;

@Service
public class RiderReviewServiceImpl implements RiderReviewService{

    @Autowired
    RiderReviewMapper riderReviewMapper;

    @Override
    public float getRiderReviewRatingAverage(int userId) {
        int[] riderAllStars = riderReviewMapper.getRiderReviewRatingAverage(userId);
        float ratingAverage = 0;
        for (int i = 0; i < riderAllStars.length; i++) {
            ratingAverage += riderAllStars[i];
        }
        ratingAverage /= riderAllStars.length;
        return ratingAverage;
    }
}
