/*
package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.model.dto.Reviews;
import walking_beans.walking_beans_backend.service.reviewService.ReviewService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("api/reviews")
public class ReviewAPIController {
    @Autowired
    private ReviewService reviewService;

    // 특정 매장의 모든 리뷰 조회
    @GetMapping("/{storeId}")
    public ResponseEntity<List<Reviews>> getReviewsByStore(@PathVariable long storeId) {
        return ResponseEntity.ok(reviewService.getReviewsByStore(storeId));
    }

    //리뷰 작성
    @PostMapping
    public ResponseEntity<Reviews> insertReview(
            @RequestParam("userId") Long userId,
            @RequestParam("storeId") Long storeId,
            @RequestParam("orderId") Long orderId,
            @RequestParam("reviewStarRating") int reviewStarRating,
            @RequestParam("reviewContent") String reviewContent,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        try {
            // 이미지 업로드 (있을 경우)
            String imageUrl = (file != null && !file.isEmpty()) ? reviewService.uploadToImgur(file) : null;

            // ✅ `Reviews` 객체 생성 후 `setter` 사용
            Reviews review = new Reviews();
            review.setUserId(userId);
            review.setStoreId(storeId);
            review.setOrderId(orderId);
            review.setReviewStarRating(reviewStarRating);
            review.setReviewContent(reviewContent);
            review.setReviewPictureUrl(imageUrl);
            review.setReviewCreatedDate(LocalDateTime.now());
            review.setReviewModifiedDate(LocalDateTime.now());

            // DB에 저장
            Reviews savedReview = reviewService.insertReview(review);

            return ResponseEntity.ok(savedReview);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 리뷰 수정
    @PutMapping("/{reviewId}")
    public ResponseEntity<Reviews> updateReview(@PathVariable long reviewId, @RequestBody Reviews review) {
        return ResponseEntity.ok(reviewService.updateReview(reviewId, review));
    }


    // 리뷰 삭제
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}
*/
