package walking_beans.walking_beans_backend.service.riderReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.RiderReviewMapper;
import walking_beans.walking_beans_backend.model.dto.RiderReview;

import java.util.List;

@Service
public class RiderReviewServiceImpl implements RiderReviewService{

    @Autowired
    RiderReviewMapper riderReviewMapper;

    @Override
    public float getRiderReviewRatingAverage(long riderId) {
        List<Integer> riderAllStars = riderReviewMapper.getRiderReviewRatingAverage(riderId);
        float ratingAverage = 0;
        for (int star : riderAllStars) {
            ratingAverage += star;
        }
        ratingAverage /= riderAllStars.size();
        return ratingAverage;
    }

    @Override
    public Integer insertRiderReview(RiderReview riderReview) {
        return riderReviewMapper.insertRiderReview(riderReview);
    }
}
