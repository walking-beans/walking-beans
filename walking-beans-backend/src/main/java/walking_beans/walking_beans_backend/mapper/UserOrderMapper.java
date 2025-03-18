package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.UserOrderDTO;

import java.util.List;

@Mapper
public interface UserOrderMapper {

    // 특정 유저의 주문 목록 조회
    List<UserOrderDTO> getOrdersByUserId(@Param("userId") Long userId);

    UserOrderDTO getOrderByOrderNumber(@Param("orderNumber") String orderNumber);
}