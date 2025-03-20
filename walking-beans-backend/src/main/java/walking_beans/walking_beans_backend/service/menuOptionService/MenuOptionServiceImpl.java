package walking_beans.walking_beans_backend.service.menuOptionService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.MenuOptionMapper;
import walking_beans.walking_beans_backend.model.dto.MenuOption;

import java.util.List;
@Service
public class MenuOptionServiceImpl implements MenuOptionService {

    @Autowired
    private MenuOptionMapper menuOptionMapper;

    @Override
    public List<MenuOption> findAllMenuOption() {
        return menuOptionMapper.findAllMenuOption();
    }

    @Override
    public List<MenuOption> searchMenuOption(String keyword) {
        return menuOptionMapper.searchMenuOption(keyword);
    }

    @Override
    public MenuOption findMenuOptionById(long optionId) {
        return menuOptionMapper.findMenuOptionById(optionId);
    }

    @Override
    public List<MenuOption>  findMenuOptionByMenuId(long menuId) {
        return menuOptionMapper.findMenuOptionByMenuId(menuId);
    }

    @Override
    public void updateMenuOption(MenuOption menuOption) {
        menuOptionMapper.updateMenuOption(menuOption);

    }

    @Override
    @Transactional // list 실패 가능성이 높아 예외발생(IllegalArgumentException)시 롤백을 보장.
    public void addMenuOption(List<MenuOption> menuOptions) { // 리스트라 복수형으로 변수명 변경
        if (menuOptions == null || menuOptions.isEmpty()) { // 옵션데이터 공백 예외처리
            throw new IllegalArgumentException("menuOptions is null or empty");
        }
        menuOptionMapper.addMenuOption(menuOptions);

    }

    @Override
    public void deleteMenuOption(long optionId) {
        menuOptionMapper.deleteMenuOption(optionId);

    }

    @Override
    public MenuOption selectMenuInfoToCart(long optionId) {
        return menuOptionMapper.selectMenuInfoToCart(optionId);
    }

    @Override
    public Integer selectOptionByMenuIdAndName(long menuId, String optionName) {
        return menuOptionMapper.selectOptionByMenuIdAndName(menuId, optionName);
    }
}
