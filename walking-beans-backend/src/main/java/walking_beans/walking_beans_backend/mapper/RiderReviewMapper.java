package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestBody;
import walking_beans.walking_beans_backend.model.dto.RiderReview;

import java.util.List;

@Mapper
public interface RiderReviewMapper {

    List<Integer> getRiderReviewRatingAverage(long riderId);

    Integer insertRiderReview(RiderReview riderReview);

}
