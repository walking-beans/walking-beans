package walking_beans.walking_beans_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.UserOrderMapper;
import walking_beans.walking_beans_backend.model.dto.UserOrderDTO;

import java.util.List;


@Service
public class UserOrderServiceImpl implements UserOrderService {
    @Autowired
    private  UserOrderMapper userOrderMapper;


    @Override
    public UserOrderDTO getOrderByOrderNumber(String orderNumber) {
        return userOrderMapper.getOrderByOrderNumber(orderNumber);
    }


    @Override
    public List<UserOrderDTO> getOrdersByUserId(Long userId) {
        return userOrderMapper.getOrdersByUserId(userId);
    }
}