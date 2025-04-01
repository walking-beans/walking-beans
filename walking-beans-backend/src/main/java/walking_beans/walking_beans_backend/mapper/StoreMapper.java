package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import walking_beans.walking_beans_backend.model.dto.Stores;
import walking_beans.walking_beans_backend.model.dto.rider.RiderMainStoreInfo;

import java.util.List;

@Mapper
public interface StoreMapper {

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
    void updateStore(Stores stores);

    // 조작 권한 검증
    long getStoreIdByUserId(long userId);

    // 매장정보 삭제하기
    void deleteStores(long storeId);

    // 반경 10km 내의 매장 검색
    List<Stores> findNearbyStores(
            @Param("lat") double lat,
            @Param("lng") double lng,
            @Param("radius") double radius
    );

    /**************************************** Leo ****************************************/
    // 매장 주소 가져오기 by order id
    Stores getStoreAddressByOrderId(long orderId);

    // 라이더가 필요한 주문 접수 중 매장 주소 가져오기
    List<RiderMainStoreInfo> getStoreInfoInRiderMain();
}
