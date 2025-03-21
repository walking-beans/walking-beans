package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;

import java.util.List;

@Mapper
public interface OrderStoreMapper {
    List<OrderStoreDTO> getOrdersForRider();

    List <OrderStoreDTO> getOrdersByRiderIdOnDuty();

    OrderStoreDTO getOrderByOrderId(@Param("orderId") long orderId);
}