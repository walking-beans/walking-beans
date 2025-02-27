package walking_beans.walking_beans_backend.service.menuOptionService;

import walking_beans.walking_beans_backend.model.dto.MenuOption;

import java.util.List;

public interface MenuOptionService {

    // 메뉴옵션 전체 검색
    List<MenuOption> findAllMenuOption();

    // 메뉴옵션 검색
    List<MenuOption> searchMenuOption(String keyword);

    // ID 로 메뉴 찾기
    MenuOption findMenuOptionById(long optionId);

    // 메뉴에 속한 메뉴옵션 찾기
    List<MenuOption>  findMenuOptionByMenuId(long menuId);

    // 메뉴옵션 수정하기
    void updateMenuOption(MenuOption menuOption);

    // 메뉴옵션 추가하기
    void addMenuOption(MenuOption menuOption);

    // 메뉴옵션 삭제하기
    void deleteMenuOption(long optionId);

    // 장바구니에 등록할 메뉴, 메뉴옵션 가져오기
    MenuOption selectMenuInfoToCart(long menuOption);
}
