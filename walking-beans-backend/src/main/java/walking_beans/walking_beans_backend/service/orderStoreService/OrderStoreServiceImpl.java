package walking_beans.walking_beans_backend.service.orderStoreService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.OrderStoreMapper;
import walking_beans.walking_beans_backend.model.dto.OrderStoreDTO;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class OrderStoreServiceImpl implements OrderStoreService {
    final static int MAX_RADIUS = 30;

    @Autowired
    private OrderStoreMapper orderMapper;

    @Override
    public List<OrderStoreDTO> getOrdersForRider() {
        return orderMapper.getOrdersForRider();
    }

    @Override
    public Map<Long, List<OrderStoreDTO>> getOrdersByRiderIdOnDuty(double lat, double lng) {

        List<OrderStoreDTO> ordersList = orderMapper.getOrdersByRiderIdOnDuty();

        ordersList = ordersList.stream()
                .filter(order -> getRadius(order, lat, lng) < MAX_RADIUS)
                .toList();

        Map<Long, List<OrderStoreDTO>> groupedOrders = ordersList.stream().collect(Collectors.groupingBy(OrderStoreDTO::getStoreId));

        return groupedOrders;
    }

    @Override
    public OrderStoreDTO getOrderByOrderId(long orderId) {
        OrderStoreDTO orderStoreDTO = orderMapper.getOrderByOrderId(orderId);
        orderStoreDTO.setOrderCreateAndDeliveredDate();
        return orderStoreDTO;
    }

    public double getRadius(OrderStoreDTO order, double lat, double lng) {
        log.info("==== getRadius {}, {}, {}, {} ====", order.getStoreLatitude(), order.getStoreLongitude(), lat, lng );

        final int R = 6371; // 지구 반지름 (km)

        double dLat = (lat - order.getStoreLatitude()) * Math.PI / 180;
        double dLng = (lng - order.getStoreLongitude()) * Math.PI / 180;

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(order.getStoreLatitude() * (Math.PI / 180) * Math.cos(lat * Math.PI / 180)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        log.info("R * c = {}", R * c);
        return R * c;
    }


}