package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class DeliveryIncomeAPIController {

    @Autowired
    private DeliveryIncomeServiceImpl deliveryIncomeService;

    @GetMapping
    public List<DeliveryIncome> getDeliveryIncomeList(@RequestParam("riderId") long riderId) {
        log.info("=== /api/deliveryIncome?riderId={} ===", riderId);
        return deliveryIncomeService.getDeliveryIncomeByRiderId(riderId);
    }
    
    @GetMapping("/detail")
    public DeliveryIncome getDeliveryIncomeDetail(@RequestParam("riderId") long riderId,
                                                  @RequestParam("orderId") long orderId) {
        log.info("=== /api/deliveryIncome?riderId={}&orderId={} ===", riderId, orderId);
        return deliveryIncomeService.getDeliveryIncomeByOrderId(riderId, orderId);
    }
}
