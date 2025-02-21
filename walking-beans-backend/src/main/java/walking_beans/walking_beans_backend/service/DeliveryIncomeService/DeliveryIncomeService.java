package walking_beans.walking_beans_backend.service.DeliveryIncomeService;

import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;

import java.util.List;

public interface DeliveryIncomeService {
    List<DeliveryIncome> getDeliveryIncomeByRiderId(long riderId);

    DeliveryIncome getDeliveryIncomeByOrderId(long riderId, long orderId);
}
