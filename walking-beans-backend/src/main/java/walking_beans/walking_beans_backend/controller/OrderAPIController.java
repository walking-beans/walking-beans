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

    /*
     * 햇갈릴 수 있는 문자 제외 : 숫자 2, 5 영문자 E, I, L, O 제외 -> 총 30개
     * 제외 이유:
     *          2 : E와 발음이 동일
     *          5 : O와 발음이 동일
     *          E : 2와 발음이 동일
     *          I : L과 모양이 비슷
     *          L : I와 모양이 비슷
     *          O : 5와 발음이 동일
     */
    private static final String CHARACTERS = "01346789ABCDFGHJKMNPQRSTUVWXYZ";
    private static final int LENGTH = 9;

    public String generateOrderNumber() {

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
        String formattedDate = "B"+currentDate.format(formatter);

        String randomStr = "";
        Random random = new Random();

        // 숫자, 알파벳 대소문자로 이루어진 5자리 랜덤 문자열 생성
        StringBuffer ron = new StringBuffer(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            ron.append(randomChar);
            randomStr = ron.toString();
        }

        return formattedDate + randomStr;
    }
    // 이미 DB에 들어간 숫자들과 중복검사. 및
    // ajax나 axios로 쿼리문검사 해야하나?
    /*
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.initDirectFieldAccess();
    }

    @GetMapping("/api/orders/init-binder")
    public Order get(Order dto) {
        return dto;
    }
    */

}
