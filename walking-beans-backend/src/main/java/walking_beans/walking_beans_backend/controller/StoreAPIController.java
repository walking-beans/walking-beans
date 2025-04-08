package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.aspect.OwnershipCheck;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderMainStoreInfo;
import walking_beans.walking_beans_backend.service.FileStorageService;
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
    private FileStorageService fileStorageService;

    @Autowired
    private
    UserServiceImpl userService;

    /**매장 전체정보 불러오기
     * List<Stores>
     * @return ResponseEntity<List<Stores>>
     */
    @GetMapping
    public ResponseEntity<List<Stores>> findAllStores() {
        return ResponseEntity.ok(storeService.findAllStores());
    }

    /**특정 매장 불러오기
     *
     * @param storeId
     * @return Stores
     */
    @GetMapping("/{storeId}")
    public Stores findStoresById(@PathVariable("storeId") long storeId) {
        return storeService.findStoresById(storeId);
    }

    /**회원(업주) ID로 매장 불러오기
     *
     * @param userId
     * @return Stores
     */
    @GetMapping("/mystore/{userId}")
    public Stores findStoresByuserId(@PathVariable long userId) {
        return storeService.findStoresByuserId(userId);
    }


    /**회원 ID 로 매장 ID 찾기
     *
     * @param userId
     * @return StoreId
     */
    @GetMapping("/valid/{userId}")
    public long getStoreIdByUserId(@PathVariable long userId) {
        return storeService.getStoreIdByUserId(userId);
    }

    /**신규매장 등록하기
     *  유저 정보 추가후 재검증 필요 외래키 부족
     * @param stores
     */
    @PostMapping
    public void addStore(
            @RequestPart("stores") Stores stores,
            @RequestPart(value = "storePictureUrl", required = false) MultipartFile storePictureUrl)
            { // 이미지 처리 -> 서비스로 이동
                System.out.println("컨트롤러 진입");
                System.out.println("컨트롤러 - 수신된 Stores: " + stores);
                System.out.println("컨트롤러 - 수신된 파일: " + (storePictureUrl != null ? storePictureUrl.getOriginalFilename() : "null"));

                try { // MultipartFile, ModelAttribur 에러 가능성이 높다고 경고하여 추가
                    if(storePictureUrl != null && !storePictureUrl.isEmpty()) { // 파일이 존재할때
                        String fileUrl = fileStorageService.saveFile(storePictureUrl);
                        stores.setStorePictureUrl(fileUrl);
                    }
        // 가게 등록
        storeService.addStore(stores);
        // 유저 역활 업데이트
        // userService.updateUserRoleStore(stores.getUserId(), (byte) 3); // 1 -> 3으로 변경
                } catch (Exception e) {
                    log.error(e.getMessage());
                }

    }

    /**매장정보 수정하기
     *
     * @param storeId
     * @return
     */
    @PatchMapping("/update/{storeId}")
    @OwnershipCheck
    public ResponseEntity<?> updateStore(
            HttpSession session,
            @PathVariable("storeId") long storeId,
             @RequestParam("userId") long userId,
             @RequestParam("storeName") String storeName,
             @RequestParam("storeDescription") String storeDescription,
             @RequestParam("storeMainMenu") long storeMainMenu,
             @RequestParam("storeBusinessNumber") int storeBusinessNumber,
             @RequestParam("storePhone") String storePhone,
             @RequestParam("storeOperationHours") String storeOperationHours,
             @RequestParam("storeClosedDates") String storeClosedDates,
             @RequestParam("storeStatus") String storeStatus,                                  //
             @RequestParam("storeMinDeliveryTime") int storeMinDeliveryTime,
             @RequestParam("storeMaxDeliveryTime") int storeMaxDeliveryTime,
             @RequestParam("storeDeliveryTip") int storeDeliveryTip,
             @RequestParam("storeDeliveryAddress") String storeDeliveryAddress,
             @RequestParam("storeAddress") String storeAddress,
            @RequestParam("storeLatitude") double storeLatitude,
            @RequestParam("storeLongitude") double storeLongitude,
            @RequestPart(value = "storePictureUrl", required = false) MultipartFile storePictureUrl){

        // DTO 생성
        Stores store = new Stores();
        store.setStoreId(storeId);
        store.setUserId(userId);
        store.setStoreName(storeName);
        store.setStoreDescription(storeDescription);
        store.setStoreMainMenu(storeMainMenu);
        store.setStoreBusinessNumber(storeBusinessNumber);
        store.setStorePhone(storePhone);
        store.setStoreOperationHours(storeOperationHours);
        store.setStoreClosedDates(storeClosedDates);
        store.setStoreStatus(storeStatus);                           //
        store.setStoreMinDeliveryTime(storeMinDeliveryTime);
        store.setStoreMaxDeliveryTime(storeMaxDeliveryTime);
        store.setStoreDeliveryTip(storeDeliveryTip);
        store.setStoreDeliveryAddress(storeDeliveryAddress);
        store.setStoreAddress(storeAddress);
        store.setStoreLatitude(storeLatitude);
        store.setStoreLongitude(storeLongitude);

        // 서비스 전달
        storeService.updateStore(store, storePictureUrl);

        // 이미지 디버깅
        System.out.println("컨트롤러 - storeId: " + storeId);
        System.out.println("컨트롤러 - storePictureUrl: " + (storePictureUrl != null ? storePictureUrl.getOriginalFilename() : "null"));
        return ResponseEntity.ok().build(); // 성공시
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

