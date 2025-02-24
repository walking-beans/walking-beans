package walking_beans.walking_beans_backend.service.stores;

import walking_beans.walking_beans_backend.model.dto.Stores;

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
    void addStores(Stores stores);

    // 매장정보 수정하기
    void updateStores(Stores stores);

    // 매장정보 삭제하기
    void deleteStores(long storeId);

    /**************************************** Leo ****************************************/
    // 매장 주소 가져오기 by order id
    Stores getStoreAddressByOrderId(long orderId);
}
