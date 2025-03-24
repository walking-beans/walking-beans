package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;

import java.util.List;

@Mapper
public interface DeliveryIncomeMapper {
    List<DeliveryIncome> getDeliveryIncomeByRiderId(@Param("riderId") long riderId, @Param("todaysMonth") int todaysMonth, @Param("todaysYear") int todaysYear);

    DeliveryIncome getDeliveryIncomeByOrderId(@Param("riderId") long riderId, @Param("orderId") long orderId);

    Integer insertDeliveryIncome(DeliveryIncome deliveryIncome);
}
