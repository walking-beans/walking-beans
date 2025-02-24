package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RiderReviewMapper {

    List<Integer> getRiderReviewRatingAverage(long riderId);

}
