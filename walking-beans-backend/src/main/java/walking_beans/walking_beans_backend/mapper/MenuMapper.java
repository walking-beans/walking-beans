package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.Menu;

import java.util.List;

@Mapper
public interface MenuMapper {

    // 메뉴 전체 검색
    List<Menu> findAllMenu();

    // 메뉴 검색
    List<Menu> searchMenu(String keyword);

    // ID 로 메뉴 찾기
    Menu findMenuById(long menuId);

    // 가게에 속한 메뉴 찾기
    List<Menu> findMenuByStoreId(long storeId);

    // 메뉴 수정하기
    void updateMenu(Menu menu);

    // 메뉴 추가하기
    void addMenu(Menu menu);

    // 약한 삭제
    void softDeleteMenu(long menuId);

    // 약한 삭제 복구
    void softRecoveryMenu(long menuId);

    // 메뉴 삭제하기
    void deleteMenu(long menuId);

    // 대표메뉴 정보 가져오기
    Menu findMainMenuByStoreId(long storeId);

}
