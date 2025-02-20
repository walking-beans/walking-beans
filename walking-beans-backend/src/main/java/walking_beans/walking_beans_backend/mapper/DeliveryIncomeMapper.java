package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;

import java.util.List;

@Mapper
public interface DeliveryIncomeMapper {
    List<DeliveryIncome> getDeliveryIncomeByRiderId(int riderId);

}
