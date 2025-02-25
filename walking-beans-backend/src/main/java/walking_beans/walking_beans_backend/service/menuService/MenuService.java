package walking_beans.walking_beans_backend.service.menuService;


import walking_beans.walking_beans_backend.model.dto.Menu;

import java.util.List;

public interface MenuService {

    // 메뉴 전체 검색
    List<Menu> findAllMenu();

    // 메뉴 검색
    List<Menu> searchMenu(String keyword);

    // ID 로 메뉴 찾기
    Menu findMenuById(long menuId);

    // 가게에 속한 메뉴 찾기
    List<Menu> findMenuByStoreId(long StoreId);

    // 메뉴 수정하기
    void updateMenu(Menu menu);

    // 메뉴 추가하기
    void addMenu(Menu menu);

    // 메뉴 삭제하기
    void deleteMenu(long menuId);
}
