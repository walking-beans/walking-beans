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
    public List<DeliveryIncome> getDeliveryIncomeByRiderId(int riderId) {
        return deliveryIncomeMapper.getDeliveryIncomeByRiderId(riderId);
    }
}
