package walking_beans.walking_beans_backend.service.deliveryIncomeService;

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
    public List<DeliveryIncome> getDeliveryIncomeByRiderId(long riderId) {
        return deliveryIncomeMapper.getDeliveryIncomeByRiderId(riderId);
    }

    @Override
    public DeliveryIncome getDeliveryIncomeByOrderId(long riderId, long orderId) {
        return deliveryIncomeMapper.getDeliveryIncomeByOrderId(riderId, orderId);
    }
}
