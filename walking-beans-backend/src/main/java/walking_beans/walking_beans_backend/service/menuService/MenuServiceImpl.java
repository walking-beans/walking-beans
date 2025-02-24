package walking_beans.walking_beans_backend.service.menuService;

import org.springframework.stereotype.Service;

import walking_beans.walking_beans_backend.model.dto.Menu;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {
    @Override
    public List<Menu> findAllMenu() {
        return List.of();
    }

    @Override
    public List<Menu> searchMenu() {
        return List.of();
    }

    @Override
    public Menu findMenuById(long menuId) {
        return null;
    }

    @Override
    public Menu findMenuByStoreId(long StoreId) {
        return null;
    }

    @Override
    public void updateMenu(Menu menu) {

    }

    @Override
    public void addMenu(Menu menu) {

    }

    @Override
    public void deleteMenu(Menu menu) {

    }
}
