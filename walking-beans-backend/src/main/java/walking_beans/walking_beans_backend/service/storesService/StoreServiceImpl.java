package walking_beans.walking_beans_backend.service.storesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.mapper.StoreMapper;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderMainStoreInfo;
import walking_beans.walking_beans_backend.service.FileStorageService;

import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    // 이미지 저장 서비스 생성자 주입
    private final FileStorageService fileStorageService;

    public StoreServiceImpl(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @Autowired
    private StoreMapper storeMapper;


    //매장 전체 불러오기
    @Override
    public List<Stores> findAllStores() {
        return storeMapper.findAllStores();
            }

    //매장 검색
    @Override
    public List<Stores> searchStore(String keyword) {

        return storeMapper.searchStore(keyword);
    }


    //특정 매장 불러오기, ID
    @Override
    public Stores findStoresById(long storeId) {

        return storeMapper.findStoresById(storeId);
    }

    // 회원(업주) ID로 매장 불러오기
    @Override
    public Stores findStoresByuserId(long userId) {

        return storeMapper.findStoresByuserId(userId);
    }

    // 신규매장 등록하기
    @Override
    public void addStore(Stores stores
                         ) {

        storeMapper.addStore(stores);

    }

    // 매장정보 수정하기
    @Override
    public void updateStore(Stores store, MultipartFile storePictureUrl
                            ) {
        // 디버깅용
        System.out.println("서비스 도달 요청 받음");
        System.out.println("서비스 - storeId: " + store.getStoreId());
        System.out.println("서비스 - storePictureUrl: " + (storePictureUrl != null ? storePictureUrl.getOriginalFilename() : "null"));

        Stores existingStore = storeMapper.findStoresByuserId(store.getUserId());
        if (existingStore == null) {
            throw new RuntimeException("가게를 찾을 수 없습니다.");
        }
        // 디버깅용
        System.out.println("서비스 - 기존 storePictureUrl: " + existingStore.getStorePictureUrl());

        String newPictureUrl = storePictureUrl != null && !storePictureUrl.isEmpty()
                ? fileStorageService.saveFile(storePictureUrl)
                : existingStore.getStorePictureUrl();
        // 디버깅용
        System.out.println("서비스 - 새 storePictureUrl: " + newPictureUrl);
        store.setStorePictureUrl(newPictureUrl);

        storeMapper.updateStore(store);
        // 디버깅용
        System.out.println("서비스 - DB 업데이트 완료");
    }

    // 권한 검증용 id 확인
    @Override
    public long getStoreIdByUserId(long userId) {
        return storeMapper.getStoreIdByUserId(userId);
    }

    // 매장정보 삭제하기 - 관리자만 사용 가능
    @Override
    public void deleteStores(long storeId) {
        storeMapper.deleteStores(storeId);
    }

    // 반경 10km 내의 매장 검색
    @Override
    public List<Stores> findNearbyStores(double lat, double lng) {
        return storeMapper.findNearbyStores(lat, lng, 10.0);
    }

    /**************************************** Leo ****************************************/
    // 매장 주소 가져오기 by order id
    @Override
    public Stores getStoreAddressByOrderId(long orderId) {
        return storeMapper.getStoreAddressByOrderId(orderId);
    }

    @Override
    public List<RiderMainStoreInfo> getStoreInfoInRiderMain() {
        return storeMapper.getStoreInfoInRiderMain();
    }
}
