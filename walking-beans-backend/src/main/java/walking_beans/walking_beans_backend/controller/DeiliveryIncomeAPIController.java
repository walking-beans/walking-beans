package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;
import walking_beans.walking_beans_backend.service.DeliveryIncomeService.DeliveryIncomeServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/deliveryIncome")
public class DeiliveryIncomeAPIController {

    @Autowired
    private DeliveryIncomeServiceImpl deliveryIncomeService;

    @GetMapping("/")
    public List<DeliveryIncome> getDeliveryIncome(@RequestParam("userId") int userId,
                                                  @RequestParam("orderId") int orderId) {
        return deliveryIncomeService.getDeliveryIncomeByOrderId(userId, orderId);
    }
}
