package walking_beans.walking_beans_backend.service.DeliveryIncomeService;

import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;

import java.util.List;

public interface DeliveryIncomeService {
    List<DeliveryIncome> getDeliveryIncomeByOrderId(int userId, int orderId);
}
