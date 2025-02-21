package walking_beans.walking_beans_backend.service.menuOptionService;

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
    public List<MenuOption> searchMenuOption() {
        return menuOptionMapper.searchMenuOption();
    }

    @Override
    public MenuOption findMenuOptionById(long optionId) {
        return menuOptionMapper.findMenuOptionById(optionId);
    }

    @Override
    public MenuOption findMenuOptionByMenuId(long menuId) {
        return menuOptionMapper.findMenuOptionByMenuId(menuId);
    }

    @Override
    public void updateMenuOption(MenuOption menuOption) {
        menuOptionMapper.updateMenuOption(menuOption);

    }

    @Override
    public void addMenuOption(MenuOption menuOption) {
        menuOptionMapper.addMenuOption(menuOption);

    }

    @Override
    public void deleteMenuOption(MenuOption menuOption) {
        menuOptionMapper.deleteMenuOption(menuOption);

    }



}
