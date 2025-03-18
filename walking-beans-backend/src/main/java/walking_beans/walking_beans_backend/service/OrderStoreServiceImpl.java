package walking_beans.walking_beans_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.OrderStoreMapper;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderStoreServiceImpl implements OrderStoreService {
    @Autowired
    private OrderStoreMapper orderMapper;

    @Override
    public List<OrderStoreDTO> getOrdersForRider() {
        return orderMapper.getOrdersForRider();
    }

    @Override
    public Map<Long, List<OrderStoreDTO>> getOrdersByRiderIdOnDuty() {

        List<OrderStoreDTO> ordersList = orderMapper.getOrdersByRiderIdOnDuty();

        Map<Long, List<OrderStoreDTO>> groupedOrders = ordersList.stream().collect(Collectors.groupingBy(OrderStoreDTO::getStoreId));


        return groupedOrders;
    }
}