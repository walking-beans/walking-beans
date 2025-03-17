package walking_beans.walking_beans_backend.service.menuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.mapper.MenuMapper;
import walking_beans.walking_beans_backend.model.dto.Menu;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class MenuServiceImpl implements MenuService {

    @Value("${upload-img}")
    private String uploadImg;

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
    public List<Menu> findMenuByStoreId(long storeId) {

        return menuMapper.findMenuByStoreId(storeId);
    }


    @Override
    public void updateMenu(String menuName,
                           long menuId,
                           int menuPrice ,
                           String menuDescription,
                           String menuCategory,
                           MultipartFile menuPictureUrl) {

        String uniqueFileName = System.currentTimeMillis() + menuPictureUrl.getOriginalFilename();

        try{
            File file = new File(uploadImg+uniqueFileName);
            menuPictureUrl.transferTo(file);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
        Menu menu = new Menu();
        menu.setMenuName(menuName);
        menu.setMenuId(menuId);
        menu.setMenuDescription(menuDescription);
        menu.setMenuCategory(menuCategory);
        menu.setMenuPrice(menuPrice);
        menu.setMenuPictureUrl("/upload/"+ uniqueFileName);

        menuMapper.updateMenu(menu);
    }

    @Override
    public void addMenu(String menuName, long menuId, int menuPrice ,String menuDescription, String menuCategory, MultipartFile menuPictureUrl) {

        String uniqueFileName = System.currentTimeMillis() + menuPictureUrl.getOriginalFilename();

        try{
            File file = new File(uploadImg+uniqueFileName);
            menuPictureUrl.transferTo(file);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
        Menu menu = new Menu();
        menu.setMenuName(menuName);
        menu.setMenuId(menuId);
        menu.setMenuDescription(menuDescription);
        menu.setMenuCategory(menuCategory);
        menu.setMenuPrice(menuPrice);
        menu.setMenuPictureUrl("/upload/"+uniqueFileName);

        menuMapper.addMenu(menu);
    }

    @Override
    public void deleteMenu(long menuId) {
        menuMapper.deleteMenu(menuId);
    }

    // 대표메뉴 정보 가져오기
    @Override
    public List<Menu> findMainMenuByStoreId(long storeId) {
        return menuMapper.findMainMenuByStoreId(storeId);
    }
}
