package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Address;
import walking_beans.walking_beans_backend.model.dto.Users;
import walking_beans.walking_beans_backend.service.addressService.AddressService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/addresses")
public class AddressAPIController {
    @Autowired
    private AddressService addressService;


    @GetMapping
    public ResponseEntity<List<Address>> getAllAddresses() {
        List<Address> addresses = addressService.getAllAddresses();
        return ResponseEntity.ok(addresses);
    }
    // 로그인한 사용자의 주소 목록 조회
    @GetMapping("/loginAddresses")
    public List<Address> getLoginAddresses(HttpSession session) {
        Users user = (Users) session.getAttribute("user"); // 세션에 로그인한 사용자 정보 가져오기
        if (user == null) {
            throw new IllegalStateException("로그인이 필요합니다");
        }
        return addressService.getAddressByUserId(user.getUserId());
    }

    // 주소 추가
    @PostMapping("/UserInsertAddress")
    public String UserInsertAddress(@RequestBody Address address) {
        addressService.insertAddress(address);
        return "주소가 성공적으로 추가되었습니다.";
    }
    
    // 특정 userId의 주소 조회
    @GetMapping("/{userId}")
    public List<Address> getAddressByUserId(@PathVariable("userId") Long userId) {
        return addressService.getAddressByUserId(userId);
    }

    // 대표 주소 설정
    @GetMapping("/primaryAddresses")
    public Address getPrimaryAddressByUserId(HttpSession session) {
        Users user = (Users) session.getAttribute("user"); // 세션에 로그인한 사용자 정보 가져오기
        if (user == null) {
            throw new IllegalStateException("로그인이 필요합니다");
        }
        Long userId = Long.parseLong(user.getUserName());
        return addressService.getPrimaryAddressByUserId(userId);
    }

    /**************************************** LEO ****************************************/

    /**
     * 유저 대표 주소 가져오기 by order_id
     * @param orderId : order id
     * @param userId : user id
     * @return : ResponseEntity.ok(Address)
     */
    @GetMapping("/userAddress/orderId")
    public ResponseEntity<Address> getUserMainAddressByOrderId(@RequestParam("orderId") long orderId,
                                                      @RequestParam("userId") long userId){
        log.info("=== /api/addresses/userMainByOrderId?orderId={}&userId={} ===", orderId, userId);
        return ResponseEntity.ok(addressService.getUserMainAddress(orderId, userId));
    }


}
