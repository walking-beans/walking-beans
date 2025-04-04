package walking_beans.walking_beans_backend.service.menuService;


import org.springframework.web.multipart.MultipartFile;
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
    void updateMenu(String menuName, long menuId, int menuPrice ,String menuDescription, String menuCategory, MultipartFile imagePath);

    // 메뉴 추가하기
    void addMenu(String menuName, long storeId, long userId, int menuPrice ,String menuDescription, String menuCategory, MultipartFile imagePath);

    // 메뉴 약한삭제 (사용자로부터 가리기만함 추후 복구가능)
    void softDeleteMenu(long menuId);

    // 약한 삭제 복구
    void softRecoveryMenu(long menuId);

    // 메뉴 완전삭제하기 (가려놓은 메뉴들 삭제하기)
    void deleteMenu(long menuId);

    // 대표메뉴 정보 가져오기
    Menu findMainMenuByStoreId(long storeId);
}
