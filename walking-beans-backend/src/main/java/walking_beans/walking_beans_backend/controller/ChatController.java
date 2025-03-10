package walking_beans.walking_beans_backend.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import walking_beans.walking_beans_backend.model.dto.ChatMessage;
import walking_beans.walking_beans_backend.service.chatService.ChatServiceImpl;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    @Autowired
    private ChatServiceImpl chatService;

    @GetMapping("/chat")
    public String chatPage(Model model) {
        List<ChatMessage> messages = chatService.getMessages();
        model.addAttribute("messages", messages);
        return "chat";
    }
}
