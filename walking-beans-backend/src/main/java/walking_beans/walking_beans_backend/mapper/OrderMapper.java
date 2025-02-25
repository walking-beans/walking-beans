package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.Orders;

import java.util.List;

@Mapper
public interface OrderMapper {
    void insertOrder(Orders order);
    Orders findOrderById(long orderId);
    List<Orders> findOrdersByUserId(long userId);

}
