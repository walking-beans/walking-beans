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
    public List<DeliveryIncome> getDeliveryIncomeByRiderId(long riderId, int todaysMonth, int todaysYear) {
        List<DeliveryIncome> incomeList = deliveryIncomeMapper.getDeliveryIncomeByRiderId(riderId, todaysMonth, todaysYear);
        for (DeliveryIncome income : incomeList) {
            income.changeDateFormat();
        }
        return incomeList;
    }

    @Override
    public DeliveryIncome getDeliveryIncomeByOrderId(long riderId, long orderId) {
        DeliveryIncome income = deliveryIncomeMapper.getDeliveryIncomeByOrderId(riderId, orderId);
        income.changeDateFormat();
        return income;
    }

    @Override
    public Integer insertDeliveryIncome(DeliveryIncome deliveryIncome) {
        return deliveryIncomeMapper.insertDeliveryIncome(deliveryIncome);
    }

}
