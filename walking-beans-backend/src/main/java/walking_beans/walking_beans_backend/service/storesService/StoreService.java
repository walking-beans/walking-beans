package walking_beans.walking_beans_backend.service.storesService;

import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderMainStoreInfo;

import java.util.List;

public interface StoreService {

    //매장 전체 불러오기
    List<Stores> findAllStores();

    //매장 검색
    List<Stores> searchStore(String keyword);

    //특정 매장 불러오기, ID
    Stores findStoresById(long storeId);

    // 회원(업주) ID로 매장 불러오기
    Stores findStoresByuserId(long userId);

    // 신규매장 등록하기
    void addStore(Stores stores);

    // 매장정보 수정하기
    void updateStore(Stores stores, MultipartFile storePictureUrl);

    // 매장정보 삭제하기
    void deleteStores(long storeId);

    // 매장 소유주 확인 수정 권한 검증용
    long getStoreIdByUserId(long userId);

    // 위도경도 10km 매장
    List<Stores> findNearbyStores(double lat, double lng);

    /**************************************** Leo ****************************************/
    // 매장 주소 가져오기 by order id
    Stores getStoreAddressByOrderId(long orderId);

    // 라이더가 필요한 주문 접수 중 매장 주소 가져오기
    List<RiderMainStoreInfo> getStoreInfoInRiderMain();
}
