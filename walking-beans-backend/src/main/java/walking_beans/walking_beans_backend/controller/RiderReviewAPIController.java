package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.RiderReview;
import walking_beans.walking_beans_backend.service.riderReview.RiderReviewServiceImpl;

@Slf4j
@RestController
@RequestMapping("/api/riderReview")
public class RiderReviewAPIController {

    @Autowired
    private RiderReviewServiceImpl riderReviewService;

    /**
     * rider star average scores of rider ID
     * @param riderId : rider id
     * @return ResponseEntity.ok(Float)
     */
    @GetMapping("/star")
    public ResponseEntity<Float> getStarRating(@RequestParam("riderId") long riderId) {
        log.info("=== /api/riderReview/star?riderId={} ===", riderId);
        return ResponseEntity.ok(riderReviewService.getRiderReviewRatingAverage(riderId));
    }

    @PostMapping
    public  ResponseEntity<Integer> insertRiderReview(@RequestBody RiderReview riderReview) {
        log.info("=== /api/riderReview {} ===", riderReview);
        return ResponseEntity.ok(riderReviewService.insertRiderReview(riderReview));
    }
}
