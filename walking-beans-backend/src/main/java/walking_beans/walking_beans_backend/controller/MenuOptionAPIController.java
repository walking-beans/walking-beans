package walking_beans.walking_beans_backend.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import walking_beans.walking_beans_backend.model.dto.MenuOption;

import walking_beans.walking_beans_backend.service.menuOptionService.MenuOptionServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/menuoption")
public class MenuOptionAPIController {

    @Autowired
    private MenuOptionServiceImpl menuOptionService;

    /** 메뉴옵션 전체 검색
     *
     * @return
     */
//    @RequestMapping("/api/option")
//    public class MenuOptionAPIController {
   
    /** 메뉴옵션 검색
     *
      * @param keyword
     * @return
     */
    @GetMapping("/search")
    public List<MenuOption> searchMenuOption(@RequestParam String keyword) {
        return menuOptionService.searchMenuOption(keyword);
    }

    /** ID 로 메뉴 찾기
     *
     * @param optionId
     * @return
     */
    @GetMapping("/{optionId}")
    public MenuOption findMenuOptionById(@PathVariable long optionId) {
        return menuOptionService.findMenuOptionById(optionId);
    }

    /** 메뉴에 속한 메뉴옵션 찾기
     *
     * @param menuId
     * @return
     */
    @GetMapping("/optionmenu/{menuId}")
    public List<MenuOption> findMenuOptionByMenuId(@PathVariable long menuId) {
        return menuOptionService.findMenuOptionByMenuId(menuId);
    }

    /**메뉴 수정하기
     *
     * @param menuOption
     */
    @PutMapping("/{optionId}")
    public void updateMenuOption(@PathVariable long optionId, @RequestBody MenuOption menuOption) {
        menuOption.setOptionId(optionId);
        menuOptionService.updateMenuOption(menuOption);
    }

    /**추가하기
     *
     * @param menuOption
     */
    @PostMapping
    public void addMenuOption(@RequestBody MenuOption menuOption) {
        menuOptionService.addMenuOption(menuOption);
    }

    /**삭제하기
     *
     * @param optionId
     */
    @DeleteMapping("/delete")
    public void deleteMenuOption(@PathVariable long optionId) {
        menuOptionService.deleteMenuOption(optionId);
    }


    /**
     * 사용자가 선택한 옵션 확인하기 옵션명이 유니크한 경우
     * @param optionId
     * @return
     */

    @GetMapping("/search/{optionId}")

    public MenuOption selectMenuInfoToCart(@PathVariable long optionId) {
        return menuOptionService.selectMenuInfoToCart(optionId);
    }
}
