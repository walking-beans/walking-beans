package walking_beans.walking_beans_backend.controller;

import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.service.OrderService.OrderService;
import walking_beans.walking_beans_backend.service.OrderService.OrderServiceImpl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@RestController
@RequestMapping("/api/orders")
public class OrderAPIController {

    @Autowired
    private OrderServiceImpl orderService;


}
