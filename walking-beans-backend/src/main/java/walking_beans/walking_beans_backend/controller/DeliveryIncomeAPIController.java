package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.DeliveryIncome;
import walking_beans.walking_beans_backend.service.deliveryIncomeService.DeliveryIncomeServiceImpl;

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
    public ResponseEntity<List<DeliveryIncome>> getDeliveryIncomeList(@RequestParam("riderId") long riderId,
                                                                      @RequestParam("todaysMonth") int todaysMonth,
                                                                      @RequestParam("todaysYear") int todaysYear) {
        log.info("=== /api/deliveryIncome?riderId={}&todaysMonth={} ===", riderId, todaysMonth);
        return ResponseEntity.ok(deliveryIncomeService.getDeliveryIncomeByRiderId(riderId, todaysMonth, todaysYear));
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

    /**
     * insert DelivertIncome
     * @param deliveryIncome
     * @return ResponseEntity.ok(Integer)
     */
    @PutMapping("/finished")
    public ResponseEntity<Integer> insertDeliveryIncome(@RequestBody DeliveryIncome deliveryIncome) {
        log.info("=== /api/deliveryIncome/finished {} {} {} ===", deliveryIncome.getOrderId(), deliveryIncome.getRiderId(), deliveryIncome.getIncomeAmount());
        return ResponseEntity.ok(deliveryIncomeService.insertDeliveryIncome(deliveryIncome));
    }

}
