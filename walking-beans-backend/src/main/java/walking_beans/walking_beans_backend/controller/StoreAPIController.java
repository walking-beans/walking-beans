package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.service.storesService.StoreServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/store")
public class StoreAPIController {

    @Autowired
    private StoreServiceImpl storeService;

    /**매장 전체정보 불러오기
     * List<Stores>
     * @return
     */
    @GetMapping
    public ResponseEntity<List<Stores>> findAllStores() {
        return ResponseEntity.ok(storeService.findAllStores());
    }

    /**특정 매장 불러오기
     *
     * @param storeId
     * @return 매장 아이디로 조회
     */
    @GetMapping("/{storeId}")
    public Stores findStoresById(@PathVariable long storeId) {
        return storeService.findStoresById(storeId);
    }

    /**회원(업주) ID로 매장 불러오기
     *
     * @param userId
     * @return
     */
    @GetMapping("/mystore/{userId}")
    public Stores findStoresByuserId(@PathVariable long userId) {
        return storeService.findStoresByuserId(userId);
    }

    /**신규매장 등록하기
     *  유저 정보 추가후 재검증 필요 외래키 부족
     * @param stores
     */
    @PostMapping()
    public void addStore(@RequestBody Stores stores) {
        storeService.addStore(stores);
    }

    /**매장정보 수정하기
     *
     * @param storeId
     * @return
     */
    @PutMapping("/update/{storeId}")
    public void updateStore(@PathVariable long storeId, @RequestBody Stores stores) {
        stores.setStoreId(storeId);
        storeService.updateStores(stores);
    }

    /** 메인메뉴에서 매장 검색
     *
     * @param keyword
     * @return
     */
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
    @GetMapping("/address/orderId/{orderId}")
    public ResponseEntity<Stores> getStoreAddressByOrderId(@PathVariable("orderId") long orderId) {
        return ResponseEntity.ok(storeService.getStoreAddressByOrderId(orderId));
    }
}

