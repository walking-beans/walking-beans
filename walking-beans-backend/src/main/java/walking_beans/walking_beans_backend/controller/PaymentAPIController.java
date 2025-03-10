package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.Payments;
import walking_beans.walking_beans_backend.service.paymentService.PaymentServiceImpl;

@RestController
@RequestMapping(("/api/payments"))
public class PaymentAPIController {

    @Autowired
    private PaymentServiceImpl paymentService;

    @PostMapping
    public void insertPayments(@RequestBody Payments payments) {
        paymentService.insertPayments(payments);
    }
}
