package walking_beans.walking_beans_backend.service.reviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.ReviewMapper;
import walking_beans.walking_beans_backend.model.dto.Reviews;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    ReviewMapper reviewMapper;

    // 특정 매장 리뷰 조회
    @Override
    public List<Reviews> getReviewsByStore(long storeId) {
        return reviewMapper.getReviewsByStore(storeId);
    }



    // 리뷰 추가
    @Override
    public Reviews insertReview(Reviews review) {
        reviewMapper.insertReview(review);
        return review;
    }


    // 리뷰 수정

    @Override
    public Reviews updateReview(long reviewId, Reviews review) {
        review.setReviewId(reviewId);
        reviewMapper.updateReview(review);
        return review;
    }
    
    //리뷰 삭제
    @Override
    public void deleteReview(long reviewId) {
        reviewMapper.deleteReview(reviewId);
    }
}
