package walking_beans.walking_beans_backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import walking_beans.walking_beans_backend.aspect.OwnershipCheck;
import walking_beans.walking_beans_backend.model.dto.Menu;
import walking_beans.walking_beans_backend.service.menuService.MenuServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuAPIController {

    @Autowired
    private MenuServiceImpl menuService;

    /**
     * 메뉴 전체 검색
     *
     * @return
     */
    @GetMapping()
    public List<Menu> findAllMenu() {
        return menuService.findAllMenu();
    }

    /**
     * 메뉴 검색
     * <p>
     * keyword
     */
    @GetMapping("/search")
    public List<Menu> searchMenu(@RequestParam String keyword) {
        return menuService.searchMenu(keyword);
    }


    /**
     * ID 로 메뉴 찾기
     *
     * @param menuId
     * @return
     */
    @GetMapping("/{menuId}")
    public Menu findMenuById(@PathVariable long menuId) {
        return menuService.findMenuById(menuId);
    }

    /**
     * 가게에 속한 메뉴 찾기
     */
    @GetMapping("/storemenu/{storeId}")
    public List<Menu> findMenuByStoreId(@PathVariable long storeId) {
        return menuService.findMenuByStoreId(storeId);
    }

    /**
     * 추가하기
     *
     * @param storeId
     * @param userId
     * @param menuPrice
     * @param menuPictureUrl
     * @param menuName
     * @param menuCategory
     * @param menuDescription
     *
     * @return 권한확인후 200,401,402,403 리턴
     */
    @PostMapping("/owner/{storeId}/menu/resister/{userId}")
    @OwnershipCheck
    public ResponseEntity<?> addMenu(HttpSession session,
                                     @PathVariable("storeId") long storeId, // 권한 검증용
                                     @RequestParam("menuName") String menuName,
                                     @PathVariable("userId") long userId,
                                     @RequestParam("menuPrice") int menuPrice,
                                     @RequestParam("menuDescription") String menuDescription,
                                     @RequestParam("menuCategory") String menuCategory,
                                     @RequestParam(value = "menuPictureUrl", required = false) MultipartFile menuPictureUrl
    ) {
        System.out.println("컨트롤러 도달 요청 받음");
        menuService.addMenu(menuName, storeId, userId, menuPrice, menuDescription, menuCategory, menuPictureUrl);
        return ResponseEntity.ok().build(); // 성공시
    }


    /**
     * 메뉴 수정하기
     * @param session
     * @param storeId
     * @param menuId
     * @param menuPrice
     * @param menuDescription
     * @param menuCategory
     * @param menuPictureUrl
     *
     * @return 권한확인후 200,401,402,403 리턴
     */
    @PatchMapping("/owner/{storeId}/menu/{menuId}")
    @OwnershipCheck
    public ResponseEntity<?> updateMenu(HttpSession session,
                                        @PathVariable("storeId") long storeId, // 권한 검증용
                                        @PathVariable("menuId") long menuId,
                                        @RequestParam("menuName") String menuName,
                                        @RequestParam("menuPrice") int menuPrice,
                                        @RequestParam("menuDescription") String menuDescription,
                                        @RequestParam("menuCategory") String menuCategory,
                                        @RequestParam(value = "menuPictureUrl", required = false) MultipartFile menuPictureUrl
    ) {
        menuService.updateMenu(menuName, menuId, menuPrice, menuDescription, menuCategory, menuPictureUrl);
        return ResponseEntity.ok().build(); // 성공시
    }


    /**
     * 약한삭제 사용자에게서만 보이지 않음. 추후 복구 가능 is_deleted = 0 활성화, is_deleted = 1 비활성화
     * @param session 권한확인
     * @param storeId 권한확인
     * @param menuId 업데이트 대상
     * @return 권한확인후 200,401,402,403 리턴
     */
    @PatchMapping("/owner/{storeId}/menu/delete/{menuId}")
    @OwnershipCheck
    public ResponseEntity<?> softDeleteMenu(HttpSession session,
                                            @PathVariable("storeId") long storeId,
                                            @PathVariable("menuId") long menuId ){
        menuService.softDeleteMenu(menuId);
        return ResponseEntity.ok().build();
    }

    /**
     * 관리자만 가능하게 구현 필수
     * @param session
     * @param menuId
     * @return
     */
    @PatchMapping("/admin/menu/{menuId}")
    public ResponseEntity<?> softRecoveryMenu(HttpSession session,
                                            @PathVariable("menuId") long menuId ){
        menuService.softRecoveryMenu(menuId);
        return ResponseEntity.ok().build();
    }


    /**
     * 삭제하기
     *
     * @param menuId
     */
    @DeleteMapping("/owner/{storeId}/menu/{menuId}")
    public void deleteMenu(@PathVariable long menuId) {
        menuService.deleteMenu(menuId);
    }


    // 대표메뉴 정보 가져오기
    @GetMapping("/mainmenu/{storeId}")
    public Menu findMainMenuByStoreId(@PathVariable("storeId") long storeId) {
        return menuService.findMainMenuByStoreId(storeId);
    }

}
