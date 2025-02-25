package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Reviews;
import walking_beans.walking_beans_backend.service.reviewService.ReviewService;

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
public ResponseEntity<Reviews> insertReview(@RequestBody Reviews review) {
    return ResponseEntity.ok(reviewService.insertReview(review));}

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
