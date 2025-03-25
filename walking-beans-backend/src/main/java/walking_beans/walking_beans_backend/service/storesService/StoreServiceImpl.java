package walking_beans.walking_beans_backend.service.storesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.StoreMapper;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderMainStoreInfo;

import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

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
    public void addStore(Stores stores) {
        storeMapper.addStore(stores);
    }

    // 매장정보 수정하기
    @Override
    public void updateStores(Stores stores) {
        storeMapper.updateStores(stores);
    }
    // 권한 검증용 id 확인
    @Override
    public long getStoreIdByUserId(long userId) {
        return storeMapper.getStoreIdByUserId(userId);
    }

    // 매장정보 삭제하기
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
