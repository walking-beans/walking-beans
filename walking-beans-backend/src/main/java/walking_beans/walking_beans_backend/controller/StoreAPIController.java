package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.service.stores.StoreServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/store")
public class StoreAPIController {

    @Autowired
    private StoreServiceImpl storeService;

    // 메인메뉴에서 매장 검색
    @GetMapping("/search")
    public List<Stores> searchStore(@RequestParam String keyword) {
        return storeService.searchStore(keyword);
    }

    /**************************************** Leo ****************************************/
    /**
     * 매장 주소 가져오기 by order id
     * @param orderId : order id
     * @return : ResponseEntity.ok(Stores)
     */
    @GetMapping("/address")
    public ResponseEntity<Stores> getStoreAddressByOrderId(@RequestParam("orderId") long orderId) {
        return ResponseEntity.ok(storeService.getStoreAddressByOrderId(orderId));
    }
    // 테슻트
}

