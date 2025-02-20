package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    /**
     * get All DeliveryIncome lists by riderId
     * @param riderId : rider id
     * @return ResponseEntity.ok(List<DeliveryIncome>)
     */
    @GetMapping
    public ResponseEntity<List<DeliveryIncome>> getDeliveryIncomeList(@RequestParam("riderId") long riderId) {
        log.info("=== /api/deliveryIncome?riderId={} ===", riderId);
        return ResponseEntity.ok(deliveryIncomeService.getDeliveryIncomeByRiderId(riderId));
    }

    /**
     * get one DeliveryIncome by riderId and orderId
     * @param riderId : rider id
     * @param orderId : order id
     * @return ResponseEntity.ok(DeliveryIncome)
     */
    @GetMapping("/detail")
    public ResponseEntity<DeliveryIncome> getDeliveryIncomeDetail(@RequestParam(value = "riderId") long riderId,
                                                  @RequestParam(value = "orderId") long orderId) {
        log.info("=== /api/deliveryIncome?riderId={}&orderId={} ===", riderId, orderId);
        return ResponseEntity.ok(deliveryIncomeService.getDeliveryIncomeByOrderId(riderId, orderId));
    }
}
