package walking_beans.walking_beans_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import walking_beans.walking_beans_backend.model.dto.MenuOption;
import walking_beans.walking_beans_backend.service.menuOptionService.MenuOptionService;

@RestController
@RequestMapping("/api/option")
public class MenuOptionAPIController {
    @Autowired
    private MenuOptionService menuOptionService;

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
