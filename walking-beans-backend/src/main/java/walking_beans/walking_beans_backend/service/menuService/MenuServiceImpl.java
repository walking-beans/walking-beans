package walking_beans.walking_beans_backend.service.menuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.mapper.MenuMapper;
import walking_beans.walking_beans_backend.model.dto.Menu;
import walking_beans.walking_beans_backend.service.FileStorageService;

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

    @Autowired
    private FileStorageService fileStorageService;


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
    public void addMenu(String menuName, long storeId, long userId,int menuPrice ,String menuDescription, String menuCategory, MultipartFile menuPictureUrl) {
        System.out.println("서비스 도달 요청 받음");
        Menu menu = new Menu();
        menu.setMenuName(menuName);
        menu.setStoreId(storeId);
        menu.setUserId(userId);
        menu.setMenuDescription(menuDescription);
        menu.setMenuCategory(menuCategory);
        menu.setMenuPrice(menuPrice);
        // 이미지 등록시 변경
        menu.setMenuPictureUrl(menuPictureUrl != null && !menuPictureUrl.isEmpty()
                ? fileStorageService.saveFile(menuPictureUrl) // 파일 저장 서비스
                : menu.getMenuPictureUrl());
        // null이면 기본값 유지(아무 작업 안 함)

        menuMapper.addMenu(menu);
    }

    @Override
    public void updateMenu(String menuName,
                           long menuId,
                           int menuPrice ,
                           String menuDescription,
                           String menuCategory,
                           MultipartFile menuPictureUrl) {

        // 기존 메뉴 데이터 조회
        Menu existingMenu = menuMapper.findMenuById(menuId);
        if (existingMenu == null) {
            throw new RuntimeException("메뉴를 찾을 수 없습니다.");
        }

        Menu updatedMenu = new Menu();
        updatedMenu.setMenuId(menuId);
        updatedMenu.setMenuName(menuName);
        updatedMenu.setMenuDescription(menuDescription);
        updatedMenu.setMenuCategory(menuCategory);
        updatedMenu.setMenuPrice(menuPrice);

        // 이미지 파일이 수정되었을 경우에만 변경
        updatedMenu.setMenuPictureUrl(menuPictureUrl != null && !menuPictureUrl.isEmpty()
                ? fileStorageService.saveFile(menuPictureUrl) // 파일 저장 서비스
                : existingMenu.getMenuPictureUrl());
            // null이면 기본값 유지(아무 작업 안 함)

        menuMapper.updateMenu(updatedMenu);
    }


    @Override
    public void softDeleteMenu(long menuId) {
        menuMapper.softDeleteMenu(menuId);
    }

    @Override
    public void softRecoveryMenu(long menuId) {
        menuMapper.softRecoveryMenu(menuId);
    }


    @Override
    public void deleteMenu(long menuId) {
        menuMapper.deleteMenu(menuId);
    }

    // 대표메뉴 정보 가져오기
    @Override
    public Menu findMainMenuByStoreId(long storeId) {
        return menuMapper.findMainMenuByStoreId(storeId);
    }
}
