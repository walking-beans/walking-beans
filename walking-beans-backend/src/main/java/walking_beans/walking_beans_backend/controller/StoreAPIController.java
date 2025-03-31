package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderMainStoreInfo;
import walking_beans.walking_beans_backend.service.orderService.OrderService;
import walking_beans.walking_beans_backend.service.orderService.OrderServiceImpl;
import walking_beans.walking_beans_backend.service.storesService.StoreServiceImpl;
import walking_beans.walking_beans_backend.service.userService.UserServiceImpl;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/store")
public class StoreAPIController {

    @Autowired
    private StoreServiceImpl storeService;

    @Autowired
    private
    UserServiceImpl userService;
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
    public Stores findStoresById(@PathVariable("storeId") long storeId) {
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
    @PostMapping
    public void addStore(
            @ModelAttribute Stores stores,
            @RequestParam(value = "store_picture_url", required = false) MultipartFile storePictureUrl
                        )
            throws IOException { // 이미지 처리
        if (storePictureUrl != null && !storePictureUrl.isEmpty()) {
            String fileUrl = saveFile(storePictureUrl);
            stores.setStorePictureUrl(fileUrl);
        }
        // 가게 등록
        storeService.addStore(stores);

        // 유저 역활 업데이트
        userService.updateUserRoleStore(stores.getUserId(), (byte) 3); // 1 -> 3으로 변경
    }

    private String saveFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = "/uploads/" + fileName;
        file.transferTo(new File(filePath));
        return filePath;
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

    /**
     * 사용자 위치(lat, lng) 기준으로 주변 매장 검색
     * @param lat
     * @param lng
     * @return
     */
    @GetMapping("/nearby")
    public ResponseEntity<List<Stores>> findNearbyStores(
            @RequestParam double lat,
            @RequestParam double lng) {
        List<Stores> nearbyStores = storeService.findNearbyStores(lat, lng);
        return ResponseEntity.ok(nearbyStores);
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


    @GetMapping("/riderMain")
    public ResponseEntity<List<RiderMainStoreInfo>> getStoreInfoInRiderMain() {
        log.info("=== /api/store/riderMain ===");
        return ResponseEntity.ok(storeService.getStoreInfoInRiderMain());
    }
}

