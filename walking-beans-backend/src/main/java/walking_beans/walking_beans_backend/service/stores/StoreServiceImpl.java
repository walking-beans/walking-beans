package walking_beans.walking_beans_backend.service.stores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.StoreMapper;
import walking_beans.walking_beans_backend.model.dto.Stores;

import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreMapper storeMapper;

    //매장 전체 불러오기
    @Override
    public List<Stores> findAllStores() {
        return List.of();
    }

    //매장 검색
    @Override
    public List<Stores> searchStore(String keyword) {
        return storeMapper.searchStore(keyword);
    }




    //특정 매장 불러오기, ID
    @Override
    public Stores findStoresById(long storeId) {
        return null;
    }

    // 회원(업주) ID로 매장 불러오기
    @Override
    public Stores findStoresByuserId(long userId) {
        return null;
    }

    // 신규매장 등록하기
    @Override
    public void addStores(Stores stores) {

    }

    // 매장정보 수정하기
    @Override
    public void updateStores(Stores stores) {

    }

    // 매장정보 삭제하기
    @Override
    public void deleteStores(long storeId) {

    }
}
