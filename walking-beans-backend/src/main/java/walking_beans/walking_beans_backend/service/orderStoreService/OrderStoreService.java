package walking_beans.walking_beans_backend.service.orderStoreService;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;

import java.util.List;
import java.util.Map;


public interface  OrderStoreService {
    List<OrderStoreDTO> getOrdersForRider();

    Map<Long, List<OrderStoreDTO>> getOrdersByRiderIdOnDuty(double lat, double lng);

    OrderStoreDTO getOrderByOrderId(long orderId);
}