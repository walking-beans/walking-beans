/*
package walking_beans.walking_beans_backend.service.reviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.mapper.ReviewMapper;
import walking_beans.walking_beans_backend.model.dto.Reviews;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    ReviewMapper reviewMapper;

    @Value("${imgur.0d3ae8861e00828}")
    private String imgurClientId;

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

    @Override
    public String uploadToImgur(MultipartFile file) throws IOException {
        String url = "https://api.imgur.com/3/image";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Client-ID " + imgurClientId);
        headers.setContentType(MediaType.APPLICATION_JSON);

        byte[] fileBytes = file.getBytes();
        String encodedImage = Base64.getEncoder().encodeToString(fileBytes);

        JSONObject body = new JSONObject();
        try {
            body.put("image", encodedImage);


        HttpEntity<String> requestEntity = new HttpEntity<>(body.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        JSONObject jsonResponse = new JSONObject(response.getBody());
        return jsonResponse.getJSONObject("data").getString("link"); // 업로드된 이미지 URL 반환
    }  catch (JSONException e) {
        throw new RuntimeException(e);
    }
    }
}
*/
