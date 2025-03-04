package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Menu;
import walking_beans.walking_beans_backend.model.dto.MenuOption;
import walking_beans.walking_beans_backend.service.menuOptionService.MenuOptionService;
import walking_beans.walking_beans_backend.service.menuService.MenuService;
import walking_beans.walking_beans_backend.service.menuService.MenuServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuAPIController {

    @Autowired
    private MenuServiceImpl menuService;

    /** 메뉴 전체 검색
     *
     * @return
     */
    @GetMapping
    public List<Menu> findAllMenu() {
        return menuService.findAllMenu();
    }

    /**메뉴 검색
     *
     * keyword
     */
    @GetMapping("/search")
    public List<Menu> searchMenu(@RequestParam String keyword) {
        return menuService.searchMenu(keyword);
    }



    /** ID 로 메뉴 찾기
     *
     * @param menuId
     * @return
     */
    @GetMapping("/{menuId}")
    public Menu findMenuById(@PathVariable long menuId) {
        return menuService.findMenuById(menuId);
    }


    @Autowired
    private MenuOptionService menuOptionService;

    /**
     * 사용자가 선택한 옵션 확인하기 옵션명이 유니크한 경우
     * @param optionId
     * @return
     */
    @GetMapping("/search/option/{optionId}")
    public MenuOption selectMenuInfoToCart(@PathVariable long optionId) {
        return menuOptionService.selectMenuInfoToCart(optionId);
    }
}
