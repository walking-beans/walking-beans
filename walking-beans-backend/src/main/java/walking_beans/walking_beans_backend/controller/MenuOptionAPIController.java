package walking_beans.walking_beans_backend.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import walking_beans.walking_beans_backend.model.dto.MenuOption;

import walking_beans.walking_beans_backend.service.menuOptionService.MenuOptionServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/option")
public class MenuOptionAPIController {

    @Autowired
    private MenuOptionServiceImpl menuOptionService;

    /** 메뉴옵션 전체 검색
     *
     * @return
     */
    @GetMapping
    public List<MenuOption>  findAllMenuOption(){
        return menuOptionService.findAllMenuOption();
    }


   
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

    /**메뉴옵션 수정하기
     *
     * @param menuOption
     */
    @PutMapping("/{optionId}")
    public void updateMenuOption(@PathVariable long optionId, @RequestBody MenuOption menuOption) {
        menuOption.setOptionId(optionId);
        menuOptionService.updateMenuOption(menuOption);
    }

    /**추가하기 (여러개)
     *
     * @param menuOptions
     */
    @PostMapping
    public void addMenuOption(@RequestBody List<MenuOption> menuOptions) {
        menuOptionService.addMenuOption(menuOptions);
    }

    /**삭제하기
     *
     * @param optionId
     */
    @DeleteMapping("/{optionId}")
    public void deleteMenuOption(@PathVariable long optionId) {
        menuOptionService.deleteMenuOption(optionId);
    }

}
