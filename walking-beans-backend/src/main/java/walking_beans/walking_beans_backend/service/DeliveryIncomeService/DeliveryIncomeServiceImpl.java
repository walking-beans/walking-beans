package walking_beans.walking_beans_backend.service.DeliveryIncomeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.DeliveryIncomeMapper;
import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;

import java.util.List;

@Service
public class DeliveryIncomeServiceImpl implements DeliveryIncomeService {

    @Autowired
    private DeliveryIncomeMapper deliveryIncomeMapper;

    @Override
    public List<DeliveryIncome> getDeliveryIncomeByOrderId(int userId, int orderId) {
        return deliveryIncomeMapper.getDeliveryIncomeByOrderId(userId, orderId);
    }
}
