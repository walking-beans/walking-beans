package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.model.dto.Menu;
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

    /**가게에 속한 메뉴 찾기
     *
     */
    @GetMapping("/storemenu/{storeId}")
    public List<Menu> findMenuByStoreId(@PathVariable long storeId) {
        return menuService.findMenuByStoreId(storeId);
    }

    /**추가하기
     *
     * @param menuId
     * @param menuPrice
     * @param menuDescription
     * @param menuCategory
     * @param menuPictureUrl
     */
    @PostMapping
    public void addMenu(@RequestParam("menuName") String menuName,
                        @RequestParam("menuId") long menuId,
                        @RequestParam("menuPrice") int menuPrice,
                        @RequestParam("menuDescription") String menuDescription,
                        @RequestParam("menuCategory") String menuCategory,
                        @RequestParam(value = "menuPictureUrl",required = false) MultipartFile menuPictureUrl
                        ) {
        menuService.addMenu(menuName, menuId, menuPrice ,menuDescription, menuCategory, menuPictureUrl);
    }


    /**메뉴 수정하기
     *
     * @param menuId
     *      * @param menuPrice
     *      * @param menuDescription
     *      * @param menuCategory
     *      * @param menuPictureUrl
     */
    @PutMapping("/{menuId}")
    public void updateMenu(@PathVariable long menuId,
                           @RequestParam("menuName") String menuName,
                           @RequestParam("menuPrice") int menuPrice,
                           @RequestParam("menuDescription") String menuDescription,
                           @RequestParam("menuCategory") String menuCategory,
                           @RequestParam(value = "menuPictureUrl",required = false) MultipartFile menuPictureUrl) {

        menuService.updateMenu(menuName, menuId, menuPrice ,menuDescription, menuCategory, menuPictureUrl);
    }

    /**삭제하기
     *
     * @param menuId
     */
    @DeleteMapping("/{menuId}")
    public void deleteMenu(@PathVariable long menuId) {
        menuService.deleteMenu(menuId);
    }


}
