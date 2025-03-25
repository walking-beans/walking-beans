package walking_beans.walking_beans_backend.service.deliveryIncomeService;

import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;

import java.util.List;

public interface DeliveryIncomeService {
    List<DeliveryIncome> getDeliveryIncomeByRiderId(long riderId, int todaysMonth, int todaysYear);

    DeliveryIncome getDeliveryIncomeByOrderId(long riderId, long orderId);

    Integer insertDeliveryIncome(DeliveryIncome deliveryIncome);
}
