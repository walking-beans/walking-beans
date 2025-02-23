package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.Address;
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




    /**************************************** LEO ****************************************/

    /**
     * 유저 대표 주소 가져오기 by order_id
     * @param orderId : order id
     * @param userId : user id
     * @return : ResponseEntity.ok(Address)
     */
    @GetMapping("/userAddress/orderId")
    public ResponseEntity<Address> getUserMainAddress(@RequestParam("orderId") long orderId,
                                                      @RequestParam("userId") long userId){
        log.info("=== /api/addresses/userMainByOrderId?orderId={}&userId={} ===", orderId, userId);
        return ResponseEntity.ok(addressService.getUserMainAddress(orderId, userId));
    }


}
