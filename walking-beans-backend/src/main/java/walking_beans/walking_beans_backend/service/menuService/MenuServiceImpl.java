package walking_beans.walking_beans_backend.service.menuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import walking_beans.walking_beans_backend.mapper.MenuMapper;
import walking_beans.walking_beans_backend.model.dto.Menu;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public List<Menu> findAllMenu() {

        return menuMapper.findAllMenu();
    }

    @Override
    public List<Menu> searchMenu(String keyword) {

        return menuMapper.searchMenu(keyword);
    }

    @Override
    public Menu findMenuById(long menuId) {

        return menuMapper.findMenuById(menuId);
    }

    @Override
    public Menu findMenuByStoreId(long StoreId) {

        return menuMapper.findMenuByStoreId(StoreId);
    }

    @Override
    public void updateMenu(Menu menu) {
        menuMapper.updateMenu(menu);
    }

    @Override
    public void addMenu(Menu menu) {
        menuMapper.addMenu(menu);
    }

    @Override
    public void deleteMenu(Menu menu) {
        menuMapper.deleteMenu(menu);
    }
}
