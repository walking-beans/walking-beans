package walking_beans.walking_beans_backend.service.reviewService;

import walking_beans.walking_beans_backend.model.dto.Reviews;

import java.util.List;

public interface ReviewService {
    // 특정 매장의 리뷰 조회
    List<Reviews> getReviewsByStore(long storeId);

    // 리뷰 추가
    Reviews insertReview(Reviews review);

    // 리뷰 수정
    Reviews updateReview(long reviewId, Reviews review);

    // 리뷰 삭제
    void deleteReview(long reviewId);
}
