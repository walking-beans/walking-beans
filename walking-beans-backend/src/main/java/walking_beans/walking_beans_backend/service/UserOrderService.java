package walking_beans.walking_beans_backend.service;

import walking_beans.walking_beans_backend.model.dto.UserOrderDTO;

import java.util.List;

public interface UserOrderService {
    UserOrderDTO getOrderByOrderNumber(String orderNumber);

    List<UserOrderDTO> getOrdersByUserId(Long userId);
}