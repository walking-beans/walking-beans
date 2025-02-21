package walking_beans.walking_beans_backend.service.storesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.StoreMapper;
import walking_beans.walking_beans_backend.model.dto.Stores;

import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreMapper storeMapper;

    @Override
    public List<Stores> findAllStores() {
        return storeMapper.findAllStores();
    }

    @Override
    public List<Stores> searchStores() {
        return storeMapper.searchStores();
    }

    @Override
    public Stores findStoresById(long storeId) {
        return storeMapper.findStoresById(storeId);
    }

    @Override
    public Stores findStoresByuserId(long userId) {
        return storeMapper.findStoresByuserId(userId);
    }

    @Override
    public void addStores(Stores stores) {
        storeMapper.addStores(stores);
    }

    @Override
    public void updateStores(Stores stores) {
        storeMapper.updateStores(stores);
    }

    @Override
    public void deleteStores(long storeId) {
        storeMapper.deleteStores(storeId);
    }
}
